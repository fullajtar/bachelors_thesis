import {Body, Controller, Get, Post, Redirect, Render, ValidationPipe} from "@nestjs/common";
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

    @Get('/testing')
    @Render('blankTest.hbs')
    test(){
        return
    }


    @Post('/signup')
    @Redirect('/company/create')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {

        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @Redirect('/invoices')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}