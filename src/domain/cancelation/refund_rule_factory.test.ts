import { RefundRuleFactory } from "./refund_rule_factory";
import { FullRefund } from "./full_refund";
import { PartialRefund } from "./partial_refund";
import { NoRefund } from "./no_refund copy";

describe("RefundRuleFactory", () => {
    it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => { 
        const refunRuleFactory = RefundRuleFactory.getRefundRule(8);    
        expect(refunRuleFactory).toBeInstanceOf(FullRefund);
    });

    it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
        for (let i = 1; i <= 7; i++) {
            const refunRuleFactory = RefundRuleFactory.getRefundRule(i);
            expect(refunRuleFactory).toBeInstanceOf(PartialRefund);
        }
     });

    it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => { 
        const refunRuleFactory = RefundRuleFactory.getRefundRule(0);      
        expect(refunRuleFactory).toBeInstanceOf(NoRefund);          
    });

});