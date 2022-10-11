import { expect } from 'chai';

import User from '../../../entities/user/User';
import UserDTO from '../../../entities/user/dtos/UserDTO';
import { RoleType } from '../../../entities/user/value-objects/Role';
import InvalidIdError from '../../../entities/shared/errors/InvalidIdError';
import InvalidUsernameError from '../../../entities/user/errors/InvalidUsernameError';
import InvalidRoleError from '../../../entities/user/errors/InvalidRoleError';
import InvalidEmailError from '../../../entities/user/errors/InvalidEmailError';
import InvalidPasswordError from '../../../entities/user/errors/InvalidPasswordError';

describe('User entity', function () {
  const validUserDTO: UserDTO = {
    username: 'username',
    role: RoleType.user,
    email: 'user@user.com',
    id: 1,
    password: 'password',
    passwordHash: 'hash',
  };

  it('should create an user', function () {
    const user = User.create(validUserDTO);

    expect(user.username.value).to.be.equal('username');
    expect(user.role.value).to.be.equal(RoleType.user);
    expect(user.email.value).to.be.equal('user@user.com');
    expect(user.id!.value).to.be.equal(1);
    expect(user.password!.value).to.be.equal('password');
    expect(user.passwordHash).to.be.equal('hash');
  });

  it('should not create an user (negative id)', function () {
    const createUser = () => User.create({ ...validUserDTO, id: -1 });

    expect(createUser).to.throw(InvalidIdError, 'Invalid Id');
  });

  it('should not create an user (empty username)', function () {
    const createUser = () => User.create({ ...validUserDTO, username: '' });

    expect(createUser).to.throw(InvalidUsernameError, 'The username is empty');
  });

  it('should not create an user (username with white space)', function () {
    const createUser = () => User.create({ ...validUserDTO, username: 'abcde fgh' });

    expect(createUser).to.throw(InvalidUsernameError, 'The username has white spaces');
  });

  it('should not create an user (username too short)', function () {
    const createUser = () => User.create({ ...validUserDTO, username: 'abc' });

    expect(createUser).to.throw(InvalidUsernameError, 'The username is less than 4 characters');
  });

  it('should not create an user (username too long)', function () {
    let username = '';
    for (let i = 0; i < 65; i++) username += 'c';

    const createUser = () => User.create({ ...validUserDTO, username });

    expect(createUser).to.throw(InvalidUsernameError, 'The username is longer than 64 characters');
  });

  it('should not create an user (invalid role)', function () {
    const createUser = () => User.create({ ...validUserDTO, role: 'invalid_role' });

    expect(createUser).to.throw(InvalidRoleError, 'The user role does not exist');
  });

  it('should not create an user (empty email)', function () {
    const createUser = () => User.create({ ...validUserDTO, email: '' });

    expect(createUser).to.throw(InvalidEmailError, 'The email is empty');
  });

  it('should not create an user (invalid email)', function () {
    const createUser = () => User.create({ ...validUserDTO, email: 'invalid_email' });

    expect(createUser).to.throw(InvalidEmailError, 'The email format is invalid');
  });

  it('should not create an user (password too short)', function () {
    const createUser = () => User.create({ ...validUserDTO, password: '12345' });

    expect(createUser).to.throw(InvalidPasswordError, 'The password is less than 6 characters');
  });

  it('should not create an user (password too long)', function () {
    let password = '';
    for (let i = 0; i < 17; i++) password += 'c';

    const createUser = () => User.create({ ...validUserDTO, password });

    expect(createUser).to.throw(InvalidPasswordError, 'The password is longer than 16 characters');
  });

  it('should not create an user (password with white space)', function () {
    const createUser = () => User.create({ ...validUserDTO, password: '123456 789' });

    expect(createUser).to.throw(InvalidPasswordError, 'The password has white spaces');
  });
});
