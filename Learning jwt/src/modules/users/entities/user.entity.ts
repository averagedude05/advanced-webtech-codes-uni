//This handle db creation 
//TypeORM is a library that lets your TypeScript/Node.js code communicate with a database 
// without having to write SQL for everything.


import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name:"users" })//name of table is users
export class User{//create a class of user that represent the db table users and allow it to be imported to other files
    @PrimaryGeneratedColumn("uuid")
    id!:string;//the not is used here to tell ts that I will give it a value later but not now
    //because ts will throw error saying why is this not initialized. Typeorm will entre the value
    @Column()
    name!:string;//: defines the type is ts
    @Column()
    email!:string;
    @Column()
    password!:string;
    @CreateDateColumn()
    created_at!:Date;
    @UpdateDateColumn()
    updated_at!:Date;


    //name?:string means you can skip this property.
    




}

