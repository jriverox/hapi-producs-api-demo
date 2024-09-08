import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("products")
export class ProductModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    code: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    category: string

    @Column()
    stock: number

    @Column({ name: "creation_date" })
    creationDate: Date

    @Column()
    company: string

    @Column({ name: "company_email" })
    companyEmail: string

    @Column({ length: 2, name: "origin_country" })
    originCountry: string

}