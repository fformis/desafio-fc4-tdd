## Sobre o projeto:

Este projeto é um exemplo simplificado de um sistema de reservas de propriedades, inspirado em plataformas como o Airbnb. O objetivo é criar uma aplicação que permita aos usuários:

- **Reservar propriedades para períodos específicos.**
- **Cancelar reservas com base em políticas de reembolso.**

### Funcionalidades da Aplicação

1. **Realizar Reservas**
    - Usuários podem reservar uma propriedade para um período específico, desde que:
        - A propriedade esteja disponível para o período solicitado.
        - O número de hóspedes não exceda a capacidade máxima da propriedade.
    - O sistema calcula o preço total da reserva com base no preço por noite da propriedade e no número de noites reservadas.
        - **Descontos automáticos:** Um desconto de 10% é aplicado para reservas de 7 ou mais noites.
    - Após a confirmação da reserva, a propriedade fica indisponível para o período reservado.
2. **Cancelar Reservas**
    - Usuários podem cancelar suas reservas seguindo as políticas definidas:
        - **Mais de 7 dias antes do check-in:** O sistema emite um reembolso total.
        - **Entre 1 e 7 dias antes do check-in:** Um reembolso parcial de 50% do valor pago é emitido.
        - **Menos de 1 dia antes do check-in:** Não há reembolso.
    - Cancelamentos atualizam o status da reserva para "CANCELLED" e liberam a propriedade para novas reservas no mesmo período.
    - O sistema impede o cancelamento de reservas que já foram canceladas, informando o usuário com uma mensagem de erro.
3. **Verificar Disponibilidade**
    - O sistema verifica se a propriedade está disponível no período solicitado antes de permitir a reserva.
    - Após o cancelamento de uma reserva, a propriedade volta a ficar disponível para o período cancelado.
4. **Validar o Número de Hóspedes**
    - O sistema valida que o número de hóspedes:
        - Seja maior que zero.
        - Não exceda a capacidade máxima definida para a propriedade.
    - Reservas que não atendem a esses critérios são rejeitadas, e o sistema informa o usuário com mensagens apropriadas.


---

Fazer um reserva
- user
- property
Cancelar
