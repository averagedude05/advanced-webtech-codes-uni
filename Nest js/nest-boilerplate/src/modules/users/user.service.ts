import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService{
  /*
 @InjectRepository(User) NestJS-কে বলে User Entity-এর Repository inject করতে। 
 আর Repository<User> TypeScript-কে বলে যে এই Repository User Entity নিয়ে কাজ করবে। প্
 রথমটা dependency injection-এর জন্য, দ্বিতীয়টা type checking-এর জন্য।
 Type Checking-এর একটা কাজ: তোমার কোডে Entity-তে নেই এমন property ব্যবহার করলে ভুল ধরিয়ে দেওয়া।
 userRepository=এটি একটি property, যার মধ্যে একটি Repository object রাখা হয়।
 NestJS যখন Service-এর object তৈরি করে, তখন constructor-এর মাধ্যমে User Repository-এর object automatically inject করে দেয়। 
 সেই Repository object ব্যবহার করে আমরা find(), findOne(), save(), delete() ইত্যাদি database operations করতে পারি।
 */
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}


async getAllUsers(){
    try{
      //this বলতে বোঝায় বর্তমান class-এর object (instance)।
        const user= await this.userRepository.find();
        return user;
    }
    catch(error){
        throw error; 
    }
}

// dto: CreateUserDto tells TypeScript what data the method expects,
// helping catch mistakes when calling the service from other parts of the code.
/*
async → এই function asynchronous কাজ করবে।
dto → User-এর কাছ থেকে পাওয়া data।
CreateUserDto → Data-এর structure এবং validation rules নির্ধারণ করে।
*/
async createUser(dto:CreateUserDto){
    try{
        //creates a new instance of the user entity and stores in responce 
        const responce=this.userRepository.create(dto);
        //the responce variable contains the data and .save runs the insert parameterized query and inserts in db
        return await this.userRepository.save(responce);

    }
    catch(error){
        throw error;
    }
}
async updateUser(id: string, dto: UpdateUserDto) {
  try{
    console.log("id",id);
    if (!id) {
      throw new NotFoundException("User with ID not found");
    }
    //Database থেকে সেই User-কে খুঁজবে, যার id column(left one) এর value তোমার দেওয়া id variable(right one) এর সমান।
    const user = await this.userRepository.findOne({ where: { id:id } });//first id is what typeorm use to search is db
    if (!user) {
      throw new NotFoundException("User with ID not found");
    }
    Object.assign(user, dto);
    const {id: uid,created_at,updated_at, ...rest}=user;
    //the syntax for obj destructuring, we are extracting the id property from the employee object 
    //and assigning it to a new variable called uid. 
    //The rest of the properties of the employee object are collected into a new object called rest. This allows us to update the employee record in the database without modifying the id property, which is typically a unique identifier that should not be changed.
    //uuid baade baki shb update kra jabe
    return await this.userRepository.update({id:id}, rest);
  } 
  catch(error){
    throw error;
  }
}

async deleteUser(id: string) {
  try{
  const user = await this.userRepository.findOne({ where: { id:id } });
if (!user) {
  throw new NotFoundException("User with ID not found");  
}
return await this.userRepository.delete({id:id});
  } 
  catch(error){
    throw error;
  }
}}