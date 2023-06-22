// category-entity.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Home} from "./home";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number;
    @Column()
    nameCategory: string
    @OneToMany ( () => Home, (home) => home.category)
    home: Home[]
}