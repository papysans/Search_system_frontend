# 毕业设计课题查询系统 API 文档

## 基础信息

- **基础URL**: `http://localhost:5000/api`
- **请求格式**: JSON
- **响应格式**: JSON
- **认证方式**: Bearer Token

## 通用响应格式

所有API响应都遵循以下格式：

```javascript
{
    "code": 200,          // HTTP状态码
    "data": {             // 响应数据
        // 具体数据字段
    },
    "message": "success"  // 响应消息
}
```

## 错误响应格式

```javascript
{
    "code": 400,                 // HTTP错误码
    "message": "错误信息描述",    // 错误描述
    "errors": []                // 详细错误信息（可选）
}
```

## API 端点

### 1. 用户认证

#### 1.1 登录

- **端点**: `POST /auth/login`
- **描述**: 用户登录接口

**请求体**:
```javascript
{
    "studentId": "string",  // 学号
    "password": "string"    // 密码
}
```

**成功响应** (200):
```javascript
{
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",  // JWT token
        "user": {
            "id": "string",
            "name": "string",
            "college": "string",
            "major": "string",
            "className": "string"
        }
    },
    "message": "登录成功"
}
```

**错误响应** (401):
```javascript
{
    "code": 401,
    "message": "用户名或密码错误"
}
```

### 2. 用户信息

#### 2.1 获取用户信息

- **端点**: `GET /users/{userId}`
- **描述**: 获取指定用户的详细信息
- **认证要求**: 需要token

**请求头**:
```javascript
{
    "Authorization": "Bearer {token}"
}
```

**成功响应** (200):
```javascript
{
    "code": 200,
    "data": {
        "user": {
            "id": "string",
            "name": "string",
            "college": "string",
            "major": "string",
            "className": "string",
            "createdAt": "datetime",
            "updatedAt": "datetime"
        }
    }
}
```

### 3. 项目管理

#### 3.1 搜索项目

- **端点**: `GET /projects/search`
- **描述**: 搜索项目列表
- **认证要求**: 需要token

**查询参数**:
```javascript
{
    "query": "string",      // 搜索关键词（可选）
    "major": "string",      // 专业筛选（可选）
    "page": number,         // 页码，默认1
    "pageSize": number      // 每页数量，默认15
}
```

**成功响应** (200):
```javascript
{
    "code": 200,
    "data": {
        "projects": [
            {
                "id": number,
                "title": "string",
                "projectType": "string",
                "source": "string",
                "supervisor": {
                    "name": "string",
                    "title": "string"
                },
                "studentName": "string",
                "grade": "string",
                "major": "string",
                "className": "string",
                "practiceCompletion": boolean,
                "createdAt": "datetime",
                "updatedAt": "datetime"
            }
        ],
        "pagination": {
            "total": number,        // 总记录数
            "currentPage": number,  // 当前页码
            "totalPages": number,   // 总页数
            "pageSize": number      // 每页大小
        }
    }
}
```

#### 3.2 获取专业列表

- **端点**: `GET /majors`
- **描述**: 获取所有可选专业
- **认证要求**: 需要token

**成功响应** (200):
```javascript
{
    "code": 200,
    "data": {
        "majors": [
            {
                "id": "string",
                "name": "string",
                "college": "string"
            }
        ]
    }
}
```

## 状态码说明

- 200: 请求成功
- 400: 请求参数错误
- 401: 未授权（未登录或token失效）
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 安全性要求

1. **Token 要求**:
   - Token 有效期为 24 小时
   - Token 必须通过 Authorization header 传递
   - 格式: `Authorization: Bearer {token}`

2. **密码要求**:
   - 最小长度: 8 位
   - 必须包含: 字母和数字

3. **请求限制**:
   - 登录接口: 每IP每分钟最多 5 次请求
   - 搜索接口: 每用户每分钟最多 30 次请求

## 数据库表结构

### users 表
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    college VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### projects 表
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    project_type VARCHAR(50) NOT NULL,
    source VARCHAR(100) NOT NULL,
    supervisor_name VARCHAR(50) NOT NULL,
    supervisor_title VARCHAR(50) NOT NULL,
    student_name VARCHAR(50),
    grade VARCHAR(20),
    major VARCHAR(100) NOT NULL,
    class_name VARCHAR(50),
    practice_completion BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 开发环境

- 后端框架: Python Flask
- 数据库: PostgreSQL
- 认证: JWT
- API文档: Swagger/OpenAPI

## 部署说明

1. 数据库配置
2. 环境变量设置
3. 服务器要求
4. 部署步骤

## 注意事项

1. 所有API调用都需要处理可能的错误情况
2. 分页接口的pageSize不应超过50
3. 搜索关键词长度不应超过100个字符
4. 所有时间戳使用ISO 8601格式
5. 所有请求和响应的编码均为UTF-8
