import  config  from '../../../config/config.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    done(null, payload); //req.user
});

export default JwtStrategy;