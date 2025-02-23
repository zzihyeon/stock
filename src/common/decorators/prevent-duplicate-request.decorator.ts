import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Cache } from 'cache-manager';

export function PreventDuplicateRequest(ttl: number = 5) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheManager = Inject(CACHE_MANAGER);
      const cache = this.cacheManager as Cache;

      // 요청의 고유 키 생성 (메서드 + URL + 사용자 ID 등을 조합)
      const req = args[0].req;
      const requestKey = `request:${req.method}:${req.url}:${req.user?.id || 'anonymous'}`;

      // 이미 진행 중인 요청이 있는지 확인
      const existingRequest = await cache.get(requestKey);
      
      if (existingRequest) {
        throw new Error('이미 처리 중인 요청입니다. 잠시 후 다시 시도해주세요.');
      }

      // 새로운 요청 캐시에 저장
      await cache.set(requestKey, true, ttl * 1000);

      try {
        // 원래 메서드 실행
        const result = await originalMethod.apply(this, args);
        
        // 요청 완료 후 캐시 삭제
        await cache.del(requestKey);
        
        return result;
      } catch (error) {
        // 에러 발생 시에도 캐시 삭제
        await cache.del(requestKey);
        throw error;
      }
    };

    return descriptor;
  };
} 