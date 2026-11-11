import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";


@Controller("users")
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllUser(){
        return await this.userService.getAllUsers();
    }

    @Post("/create")
    async createUser(@Body() dto:CreateUserDto){
        return await this.userService.createUser(dto);
    }
    
    @Patch(":id")
    async updateUser(@Param("id") id:string,@Body()dto:UpdateUserDto){
        return await this.userService.updateUser(id,dto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id:string){
        return await this.userService.deleteUser(id);
    }


}
    