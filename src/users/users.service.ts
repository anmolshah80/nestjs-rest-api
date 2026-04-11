import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne.oconner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio_hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return 'No user found with this ID';
    }

    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(
    id: number,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    const user = this.findOne(id);

    if (typeof user === 'string') return;

    const updatedUser = {
      ...user,
      ...userUpdate,
    };

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return updatedUser;
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    if (typeof removedUser === 'string') return;

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
