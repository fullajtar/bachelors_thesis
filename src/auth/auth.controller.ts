import {Body, Controller, Get, Post, Redirect, Render, Session, ValidationPipe} from "@nestjs/common";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get()
    @Render('auth')
    root() {
        return ;//{ message: 'Hello world!' };
    }

    @Post('/signup')
    @Redirect('/company/create')
    signUp(
        @Session() session: Record<string, any>,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {

        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @Redirect('/invoices')
    async signIn(
        @Session() session: Record<string, any>,
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        const usernameAndId = await this.authService.signIn(authCredentialsDto);
        if (usernameAndId){
            session.username = usernameAndId[0];
            session.userid = usernameAndId[1];
        }
        console.log(session)
        return ;
    }

    @Get('/signout')
    @Render('auth')
    signOut(
        @Session() session: Record<string, any>,
    ): Promise<{ accessToken: string }> {
        session.userid = null;
        session.username = null;
        console.log(session)
        return ;
    }
}