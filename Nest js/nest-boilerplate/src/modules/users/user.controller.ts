import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
//this class(UserController) is a controller and it's base url is /users
@Controller("users") // link r end point local host 5000/
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  //CreateUserDto receives the request body. 
  //The ValidationPipe checks whether the data follows the validation rules defined in CreateUserDto.
  @Post("/create")
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Patch(":id")
  //Take the value of id from the URL and store it in the id variable, which is typed as a string.
  async updateUser(@Param("id") id: string, @Body() dto: CreateUserDto) {
    return await this.userService.updateUser(id, dto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}
