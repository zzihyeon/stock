import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

export const redisConfig = CacheModule.register({
  store: redisStore,
  host: 'redis-cli -u redis://default:EExrAPZbEIMrpRuWfVYw49cDVDjuaBBX@redis-19291.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com',
  port: 19291,
  ttl: 60, // 기본 캐시 만료 시간 (초)
}); 