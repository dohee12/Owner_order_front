// src/mocks/auth-handlers.ts
import { LoginResponse, LoginRequest } from "@/entities/auth/model/auth-types";
import { http, HttpResponse } from "msw";

// 더미 사용자 데이터 (phoneNumber와 password를 사용)
const Users = [
  {
    phoneNumber: "01011112222",
    password: "admin",
    access_token: "dummy-access-token-admin",
    access_token_expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    role: "admin",
    storeName: "Tesla",
    storeId: "store-001",
  },
  {
    phoneNumber: "01087654321",
    password: "manager",
    access_token: "dummy-access-token-manager",
    access_token_expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    role: "manager",
    storeName: "ZeroStore",
    storeId: "store-002",
  },
  {
    phoneNumber: "01011112222",
    password: "staff",
    access_token: "dummy-access-token-staff",
    access_token_expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    role: "staff",
    storeName: "LeoShop",
    storeId: "store-003",
  },
];

export const authHandlers = [
  // POST /api/v1/owner/login
  http.post<LoginResponse, LoginRequest>("/api/v1/owner/login", async ({ request }) => {
    const { phoneNumber, password } = await request.json();
    if (!phoneNumber || !password) {
      return new HttpResponse(JSON.stringify({ error: "잘못된 요청입니다." }), { status: 400 });
    }
    const user = Users.find((user) => user.phoneNumber === phoneNumber);
    if (!user) {
      return new HttpResponse(JSON.stringify({ error: "전화번호가 존재하지 않습니다." }), {
        status: 404,
      });
    }
    if (user.password !== password) {
      return new HttpResponse(JSON.stringify({ error: "비밀번호가 틀렸습니다." }), { status: 401 });
    }
    return HttpResponse.json(
      {
        access_token: user.access_token,
        access_token_expiration: user.access_token_expiration,
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie; HttpOnly; Path=/",
        },
      }
    );
  }),

  // POST /api/v1/owner/logout
  http.post("/api/v1/owner/logout", () => {
    return new HttpResponse(JSON.stringify({ message: "로그아웃 성공" }), {
      status: 200,
      headers: {
        "Set-Cookie": "connect.sid=; Max-Age=0; Path=/",
      },
    });
  }),

  // POST /api/v1/owner/renew (ACCESS_TOKEN 재발급)
  http.post("/api/v1/owner/renew", () => {
    return HttpResponse.json({
      access_token: "new-dummy-access-token",
      access_token_expiration: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
  }),
];
