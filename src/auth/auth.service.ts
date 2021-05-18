import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto
    ): Promise<[string, number]> {
        const usernameAndId = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!usernameAndId) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // const payload: JwtPayload = { username };
        // const accessToken = await this.jwtService.sign(payload);

        return usernameAndId; //{ accessToken };
    }
}
