// entities/auth/api/auth-handler.ts
import { LoginResponse, LoginRequest } from "@/entities/auth/model/auth-types";
import { http, HttpResponse } from "msw";

// 더미 사용자 데이터 (phoneNumber와 password를 사용)
const Users = [
  {
    phoneNumber: "01012345678",
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

export const handlers = [
  // 공백 제거: "/api/v1/owner/login" 으로 수정
  http.post<LoginResponse, LoginRequest>("/api/v1/owner/login", async ({ request }) => {
    const { phoneNumber, password } = await request.json();

    // 요청 데이터가 올바른지 확인
    if (!phoneNumber || !password) {
      return new HttpResponse(
        JSON.stringify({ error: "잘못된 요청입니다." }),
        { status: 400 }
      );
    }

    // 해당 phoneNumber를 가진 사용자가 있는지 확인
    const user = Users.find((user) => user.phoneNumber === phoneNumber);

    if (!user) {
      return new HttpResponse(
        JSON.stringify({ error: "전화번호가 존재하지 않습니다." }),
        { status: 404 }
      );
    }

    // 비밀번호가 일치하는지 확인
    if (user.password !== password) {
      return new HttpResponse(
        JSON.stringify({ error: "비밀번호가 틀렸습니다." }),
        { status: 401 }
      );
    }

    // 로그인 성공 시, LoginResponse에 맞는 데이터를 반환
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
];
