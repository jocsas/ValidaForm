class ValidaCPF {
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo',{
            writable:false,
            enumerable:true,
            configurable:false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }
    eSequencia(){
        return (this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo)
    }
    geraNovoCPF(){
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);
        this.novoCPF = cpfParcial + digito1 + digito2
    }
    static geraDigito(cpfParcial){
        let total = 0;
        let reverso = cpfParcial.length + 1;
        for(let digito of cpfParcial){
            total += Number(digito) * reverso
            reverso --
        }
        const digitos = 11 -(total % 11);
        return digitos > 9 ? '0' : String(digitos)
    }
    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.eSequencia()) return false;
        this.geraNovoCPF()
        return this.novoCPF === this.cpfLimpo;
    }
}/* 

let validacpf = new ValidaCPF('178.168.977-06');
if(validacpf.valida()){
    console.log('CPF válido')
}else{
    console.log('CPF inválido')
} */