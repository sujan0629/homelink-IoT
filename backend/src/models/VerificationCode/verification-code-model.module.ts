import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VerificationCodeSchema } from "./verification-code.model";

@Module({
    imports: [MongooseModule.forFeature([{name: "VerificationCode", schema: VerificationCodeSchema}])],
    exports: [MongooseModule]
})
export class VerificationCodeModelModule { }
