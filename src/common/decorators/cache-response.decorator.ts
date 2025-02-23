import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export function CacheResponse(ttl: number = 60) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = this.cacheManager as Cache;

      // 요청의 고유 키 생성
      const req = args[0].req;
      const cacheKey = `cache:${req.method}:${req.url}`;

      // 캐시된 데이터 확인
      const cachedData = await cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      // 캐시된 데이터가 없으면 원래 메서드 실행
      const result = await originalMethod.apply(this, args);
      
      // 결과를 캐시에 저장
      await cache.set(cacheKey, result, ttl * 1000);
      
      return result;
    };

    return descriptor;
  };
} 