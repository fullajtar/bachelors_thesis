import {BadRequestException, PipeTransform} from "@nestjs/common";
import {InvoicePaymentEnum} from "../invoice-payment.enum";

export class InvoicePatchValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        InvoicePaymentEnum.CASH,
        InvoicePaymentEnum.POST_COUPON,
        InvoicePaymentEnum.PROMISSORY_NOTE,
        InvoicePaymentEnum.TRANSFER,
        InvoicePaymentEnum.CARD,
    ];


    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
