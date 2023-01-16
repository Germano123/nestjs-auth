import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  users = [
    {
      id: 1,
      name: "jhon",
      email: "johntest@hotmail.com",
      password: "changeme"
    },
    {
      id: 2,
      name: "maria",
      email: "mariatest@hotmail.com",
      password: "guess"
    },
  ]

  async findBy(options: Partial<{
    id: string,
    name: string,
    email: string,
  }>): Promise<User> {
    return this.users.find(user => user.name === options.name);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  async findOne(id: number): Promise<any> {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
