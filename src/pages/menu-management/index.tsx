import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
}

const MenuManagementPage = () => {
  const [menuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "아메리카노",
      price: 4500,
      category: "커피",
      isAvailable: true,
    },
    {
      id: 2,
      name: "카페라떼",
      price: 5000,
      category: "커피",
      isAvailable: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">메뉴 관리</h1>
        <Button>새 메뉴 추가</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="mt-2 font-bold">₩ {item.price.toLocaleString()}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  수정
                </Button>
                <Button variant="outline" size="sm">
                  삭제
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagementPage;
