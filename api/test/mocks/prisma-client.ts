class Decimal {
  private readonly value: number;

  constructor(value: number | string) {
    this.value = Number(value);
  }

  toNumber(): number {
    return this.value;
  }

  toString(): string {
    return String(this.value);
  }

  valueOf(): number {
    return this.value;
  }
}

type MockDelegate = {
  findUnique: () => Promise<null>;
  findFirst: () => Promise<null>;
  findMany: () => Promise<[]>;
  create: () => Promise<Record<string, never>>;
  update: () => Promise<Record<string, never>>;
  delete: () => Promise<Record<string, never>>;
  deleteMany: () => Promise<{ count: number }>;
  count: () => Promise<number>;
};

function createDelegate(): MockDelegate {
  return {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
    count: async () => 0,
  };
}

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export const Prisma = {
  Decimal,
};

export class PrismaClient {
  user = createDelegate();
  product = createDelegate();
  category = createDelegate();
  order = createDelegate();
  cart = createDelegate();
  payment = createDelegate();
  orderItem = createDelegate();
  cartItem = createDelegate();

  async $connect(): Promise<void> {}

  async $disconnect(): Promise<void> {}

  async $transaction<T>(operations: Promise<T>[]): Promise<T[]> {
    return Promise.all(operations);
  }
}
