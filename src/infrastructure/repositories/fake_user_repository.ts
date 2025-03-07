import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";

export class FakeUserRepository implements UserRepository {
  private users: User[] = [
    new User("1", "John Doe"),
    new User("2", "Jane Smith"),
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async save(user: User) {
    this.users.push(user);
  }
}
