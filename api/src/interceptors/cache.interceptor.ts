// import { CacheInterceptor } from '@nestjs/cache-manager';
// import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class CustomCacheInterceptor extends CacheInterceptor {
//     async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//         return next.handle().pipe(
//             tap((result) => {
//                 if (result === undefined) {
//                     console.log('Skipping cache for undefined value');
//                 } else {
//                     // console.log('Caching result:', result);
//                     return super.intercept(context, next);
//                 }
//             }),
//         );
//     }
// }
