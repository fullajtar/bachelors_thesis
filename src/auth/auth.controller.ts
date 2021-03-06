import {Body, Controller, Get, Post, Redirect, Render, Res, Session, ValidationPipe} from "@nestjs/common";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {getRepository} from "typeorm";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get()
    @Render('auth/login-auth.hbs')
    signInForm(
        @Session() session: Record<string, any>,
        @Res() res
    ) :null {
        session.userid = null;
        session.username = null;
        return ;
    }

    @Get('/signup')
    @Render('auth/signup-auth.hbs')
    signUpForm() {
        return ;
    }

    @Post('/signup')
    @Redirect('/company/create')
    async signUp(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        await this.authService.signUp(authCredentialsDto);
        const usernameAndId = await this.authService.signIn(authCredentialsDto);
        if (usernameAndId){
            session.username = usernameAndId[0];
            session.userid = usernameAndId[1];
            return;
        }
        return res.redirect('/auth');
    }

    @Post('/signin')
    @Redirect('/')
    async signIn(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        const usernameAndId = await this.authService.signIn(authCredentialsDto);
        if (usernameAndId){
            session.username = usernameAndId[0];
            session.userid = usernameAndId[1];
            if (await this.hasCreatedCompany(session.userid)){
                return;
            }
            return res.redirect('/company/create');
        }
        return res.redirect('/auth');
    }

    @Get('/signout')
    @Render('auth/login-auth.hbs')
    signOut(
        @Session() session: Record<string, any>,
    ) :null {
        session.userid = null;
        session.username = null;
        return ;
    }

    private async hasCreatedCompany(
        userId: number
    ) :Promise <boolean>{
        const user = await getRepository(User).findOne({ where: { id: userId } } );
        if (user.company == null){
            return false;
        }
        return true;
    }
}