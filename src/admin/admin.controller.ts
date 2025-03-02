import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from '#/admin/admin.service';
import { CreateUserAuthorityDto } from '#/admin/dto/create-user-authority.dto';
import { UpdateUserAuthorityDto } from '#/admin/dto/update-user-authority.dto';
import { PreventDuplicateRequest } from '#/common/decorators/prevent-duplicate-request.decorator';
import { CacheResponse } from '#/common/decorators/cache-response.decorator';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @Post('authority')
  @PreventDuplicateRequest(5)
  create(@Body() createUserAuthorityDto: CreateUserAuthorityDto) {
    return this.adminService.create(createUserAuthorityDto);
  }

  @Get('authorities')
  @CacheResponse(300) // 5분 동안 캐시
  findAll() {
    return this.adminService.findAll();
  }

  @Get('authority/:userId')
  @CacheResponse(300) // 5분 동안 캐시
  findOne(@Param('userId') userId: string) {
    return this.adminService.findOne(userId);
  }

  @Patch('authority/:userId')
  @PreventDuplicateRequest(5)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserAuthorityDto: UpdateUserAuthorityDto,
  ) {
    // 업데이트 후 관련된 캐시 삭제
    const result = await this.adminService.update(userId, updateUserAuthorityDto);
    await this.cacheManager.del(`cache:GET:/admin/authority/${userId}`);
    await this.cacheManager.del('cache:GET:/admin/authorities');
    return result;
  }

  @Delete('authority/:userId')
  @PreventDuplicateRequest(5)
  async remove(@Param('userId') userId: string) {
    // 삭제 후 관련된 캐시 삭제
    const result = await this.adminService.remove(userId);
    await this.cacheManager.del(`cache:GET:/admin/authority/${userId}`);
    await this.cacheManager.del('cache:GET:/admin/authorities');
    return result;
  }
} 