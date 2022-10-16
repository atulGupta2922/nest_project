import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run befor Controller
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log(
            'debug:',
            request.headers,
            // response
        );
        // const headers = context.getArgs()[0].headers;
        // console.log('I am running before the controller: ', context.getArgs()[0].headers);
        if (!request.headers['x-line-signature']) {
            return response.status(401).json({
                error: 'not good'
            });
        }
        return handler.handle().pipe(
            map((data: any) => {
                // run after controller
                console.log("data", data);
            })
        )
    }
}