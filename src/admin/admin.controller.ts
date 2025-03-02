import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from '#/admin/admin.service';
import { CreateUserAuthorityDto } from '#/admin/dto/create-user-authority.dto';
import { UpdateUserAuthorityDto } from '#/admin/dto/update-user-authority.dto';
import { PreventDuplicateRequest } from '#/common/decorators/prevent-duplicate-request.decorator';
import { CacheResponse } from '#/common/decorators/cache-response.decorator';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @ApiOperation({ summary: '사용자 권한 생성' })
  @ApiResponse({ status: 201, description: '권한이 성공적으로 생성됨' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('authority')
  @PreventDuplicateRequest(5)
  create(@Body() createUserAuthorityDto: CreateUserAuthorityDto) {
    return this.adminService.create(createUserAuthorityDto);
  }

  @ApiOperation({ summary: '모든 사용자 권한 조회' })
  @ApiResponse({ status: 200, description: '모든 권한 목록 반환' })
  @Get('authorities')
  @CacheResponse(300)
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: '특정 사용자 권한 조회' })
  @ApiResponse({ status: 200, description: '권한 정보 반환' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @Get('authority/:userId')
  @CacheResponse(300)
  findOne(@Param('userId') userId: string) {
    return this.adminService.findOne(userId);
  }

  @ApiOperation({ summary: '사용자 권한 수정' })
  @ApiResponse({ status: 200, description: '권한이 성공적으로 수정됨' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @Patch('authority/:userId')
  @PreventDuplicateRequest(5)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserAuthorityDto: UpdateUserAuthorityDto,
  ) {
    const result = await this.adminService.update(userId, updateUserAuthorityDto);
    await this.cacheManager.del(`cache:GET:/admin/authority/${userId}`);
    await this.cacheManager.del('cache:GET:/admin/authorities');
    return result;
  }

  @ApiOperation({ summary: '사용자 권한 삭제' })
  @ApiResponse({ status: 200, description: '권한이 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @Delete('authority/:userId')
  @PreventDuplicateRequest(5)
  async remove(@Param('userId') userId: string) {
    const result = await this.adminService.remove(userId);
    await this.cacheManager.del(`cache:GET:/admin/authority/${userId}`);
    await this.cacheManager.del('cache:GET:/admin/authorities');
    return result;
  }
} 