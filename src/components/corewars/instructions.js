//Comand parent class
/*
Below is the command parent class. It includes the get_true_index, pre, post, and both call methods.
Every single assembly instruction that we compiled into JS uses this command class as its parent, and
shares these methods, which we use to alter the memory matrix as needed.
*/
class Command {
    constructor(a, b, a_am, b_am, mod, memory, memory_size){
        while (a < 0) {
            a += memory_size
        }
        this.a = a % memory_size
        while (b < 0) {
            b += memory_size
        }
        this.b = b % memory_size
        this.a_am = a_am
        this.b_am = b_am
        this.mod = mod
        this.memory = memory
        this.memory_size = memory_size
        this.index = 0
        this.player_id = -1
    }

    init(index, player_id) {
        this.index = index
        this.player_id = player_id
    }

    get_true_index(v, mod) {
        switch(mod){
            case '#':
                return this.index
            case '$' :
                return (this.index + v) % this.memory_size
            case '@': case '<': case '>':
                var new_index = (this.index + v) % this.memory_size
                return (new_index + this.memory[new_index].b) % this.memory_size
            case '*': case '{': case '}':
                var new_index = (this.index + v) % this.memory_size
                return (new_index + this.memory[new_index].a) % this.memory_size
            default:
                return -1
        }
    }


    pre(v, mod){
        if (mod==='<'){
            if (this.memory[this.index + v].b === 0) {
                this.memory[this.index+v].b = this.memory_size
            }
            else {
                this.memory[this.index+v].b -= 1
            }
        }
        if (mod==='{'){
            if (this.memory[this.index + v].a === 0) {
                this.memory[this.index+v].a = this.memory_size
            }
            else {
                this.memory[this.index+v].a -= 1
            }
        }
    }

    post(v,mod){
        if (mod==='}'){
            this.memory[this.index+v].a = (this.memory[this.index + v].a + 1) % this.memory_size
        }
        if (mod==='>'){
            this.memory[this.index+v].b = (this.memory[this.index + v].b + 1) % this.memory_size
        }
    }

    call(processes, process_index, gen, p){

        this.pre(this.a, this.a_am)
        this.pre(this.b, this.b_am)

        this._call(processes, process_index, gen, p)

        this.post(this.a, this.a_am)
        this.post(this.b, this.b_am)
    }

    _call(processes, process_index, gen, p){}
}


//All Instruction Child classes
/*
Below are the Instruction Child classes. These classes all include a constructor, and a _call method that takes
in the process, process list, and gen. The _call is called in the command class, and is for the assembly-related
purpose of each instruction command. The _call method, depending on the instruction, takes in instructional modifiers
with a switch statement, and augments the memory matrix accordingly.
*/


//add
class Add extends Command {
    _add(source, target){
        var ret = target + source
        return ret % this.memory_size
    }

    _call(processes, process_index,gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var dest = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case "A":
                this.memory[dest].a = this._add(this.memory[source].a, this.memory[dest].a)
                break
            case "B":
                this.memory[dest].b = this._add(this.memory[source].b, this.memory[dest].b)
                break
            case "AB":
                this.memory[dest].b = this._add(this.memory[source].a, this.memory[dest].b)
                break
            case "BA":
                this.memory[dest].a = this._add(this.memory[source].b, this.memory[dest].a)
                break
            case "F": case "I":
                this.memory[dest].a = this._add(this.memory[source].a, this.memory[dest].a)
                this.memory[dest].b = this._add(this.memory[source].b, this.memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                let [d_a, d_b] = [this.memory[dest].a, this.memory[dest].b]
                this.memory[dest].a = this._add(s_b, d_a)
                this.memory[dest].b = this._add(s_a, d_b)
                break
            default:
                break
        }
        processes[process_index] = (processes[process_index] + 1) % this.memory_size
    }
}

//dat
class Dat extends Command {
    _call(processes, process_index,gen, p){
        processes.splice(process_index,1)
    }
}

//div
class Div extends Command {
    constructor(a, b, a_am, b_am, mod, memory, memory_size){
        super(a, b, a_am, b_am, mod, memory, memory_size)
        this._flag = false
    }

    _div(source, target, processes, process_index){
        if (source === 0 && !this._flag) {
            processes.splice(process_index,1)
            this._flag = true
            return target
        }
        return (target / source) >> 0
    }

    _call(processes, process_index, gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var dest = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case "A":
                this.memory[dest].a = this._div(this.memory[source].a, this.memory[dest].a, processes, process_index)
                break
            case "B":
                this.memory[dest].b = this._div(this.memory[source].b, this.memory[dest].b, processes, process_index)
                break
            case "AB":
                this.memory[dest].b = this._div(this.memory[source].a, this.memory[dest].b, processes, process_index)
                break
            case "BA":
                this.memory[dest].a = this._div(this.memory[source].b, this.memory[dest].a, processes, process_index)
                break
            case "F": case "I":
                this.memory[dest].a = this._div(this.memory[source].a, this.memory[dest].a, processes, process_index)
                this.memory[dest].b = this._div(this.memory[source].b, this.memory[dest].b, processes, process_index)
                break
            case "X":
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                let [d_a, d_b] = [this.memory[dest].a, this.memory[dest].b]
                this.memory[dest].a = this._div(s_b, d_a, processes, process_index)
                this.memory[dest].b = this._div(s_a, d_b, processes, process_index)
                break
            default:
                break
        }
        if (!this._flag) {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
        this._flag = false
    }
}

//djn
class Djn extends Command {
    _cond(cond, processes, process_index, dest) {
        if (cond) {
            processes[process_index] = dest
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var dest = this.get_true_index(this.a, this.a_am)
        var check = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A': case 'BA':
                this.memory[check].a -= 1
                if (this.memory[check].a < 0)
                    this.memory[check].a += this.memory_size
                this._cond((this.memory[check].a !== 0), processes, process_index, dest)
                break
            case 'B': case 'AB':
                this.memory[check].b -= 1
                if (this.memory[check].b < 0)
                    this.memory[check].b += this.memory_size
                this._cond((this.memory[check].b !== 0), processes, process_index, dest)
                break
            case 'I': case 'X': case 'F':
                this.memory[check].a -= 1
                this.memory[check].b -= 1
                if (this.memory[check].a < 0)
                    this.memory[check].a += this.memory_size
                if (this.memory[check].b < 0)
                    this.memory[check].b += this.memory_size
                this._cond((this.memory[check].a !== 0 || this.memory[check].b !== 0), processes, process_index, dest)
                break
            default:
                break
        }

    }
}

//jmn
class Jmn extends Command {
    _cond(cond, processes, process_index, dest) {
        if (cond) {
            processes[process_index] = dest
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var dest = this.get_true_index(this.a, this.a_am)
        var check = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A': case 'BA':
                this._cond((this.memory[check].a !== 0), processes, process_index, dest)
                break
            case 'B': case 'AB':
                this._cond((this.memory[check].b !== 0), processes, process_index, dest)
                break
            case 'I': case 'X': case 'F':
                this._cond((this.memory[check].a !== 0 || this.memory[check].b !== 0), processes, process_index, dest)
                break
            default:
                break
        }

    }
}

//jmp
class Jmp extends Command {
    _call(processes, process_index, gen, p){
        var destination_index = this.get_true_index(this.a, this.a_am)
        processes[process_index] = destination_index
    }
}

//jmz
class Jmz extends Command {
    _cond(cond, processes, process_index, dest) {
        if (cond) {
            processes[process_index] = dest
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var dest = this.get_true_index(this.a, this.a_am)
        var check = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A': case 'BA':
                this._cond((this.memory[check].a === 0), processes, process_index, dest)
                break
            case 'B': case 'AB':
                this._cond((this.memory[check].b === 0), processes, process_index, dest)
                break
            case 'I': case 'X': case 'F':
                this._cond((this.memory[check].a === 0 && this.memory[check].b === 0), processes, process_index, dest)
                break
            default:
                break
        }

    }
}

//mod
class Mod extends Command {
    _mod(source, target, processes, process_index){
        if (source === 0 && !this._flag) {
            processes.splice(process_index,1)
            this._flag = true
            return target
        }
        return target % source
    }

    _call(processes, process_index, gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var dest = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case "A":
                this.memory[dest].a = this._mod(this.memory[source].a, this.memory[dest].a, processes, process_index)
                break
            case "B":
                this.memory[dest].b = this._mod(this.memory[source].b, this.memory[dest].b, processes, process_index)
                break
            case "AB":
                this.memory[dest].b = this._mod(this.memory[source].a, this.memory[dest].b, processes, process_index)
                break
            case "BA":
                this.memory[dest].a = this._mod(this.memory[source].b, this.memory[dest].a, processes, process_index)
                break
            case "F": case "I":
                this.memory[dest].a = this._mod(this.memory[source].a, this.memory[dest].a, processes, process_index)
                this.memory[dest].b = this._mod(this.memory[source].b, this.memory[dest].b, processes, process_index)
                break
            case "X":
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                let [d_a, d_b] = [this.memory[dest].a, this.memory[dest].b]
                this.memory[dest].a = this._mod(s_b, d_a, processes, process_index)
                this.memory[dest].b = this._mod(s_a, d_b, processes, process_index)
                break
            default:
                break
        }
        if (!this._flag) {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
        this._flag = false
    }
}

//mov
class Mov extends Command {
    _call(processes, process_index, gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var destination = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A':
                //moves the A-field of the source into the A-field of the destination
                this.memory[destination].a = this.memory[source].a
                break
            case 'B':
                this.memory[destination].b = this.memory[source].b
                break
            case 'AB':
                this.memory[destination].b = this.memory[source].a
                break
            case 'BA':
                this.memory[destination].a = this.memory[source].b
                break
            case 'I':
                var orig = this.memory[source]
                this.memory[destination] = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
                this.memory[destination].index = destination
                this.memory[destination].player_id = p
                break
            case 'F':
                this.memory[destination].a = this.memory[source].a
                this.memory[destination].b = this.memory[source].b
                break
            case 'X':
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                this.memory[destination].a = s_b
                this.memory[destination].b = s_a
                break
            default:
                break
        }
        // incrementing by one, after the move
        processes[process_index] = (processes[process_index] + 1) % this.memory_size

    }
}

//mul
class Mul extends Command {
    _mul(source, target){
        var ret = target * source
        return ret % this.memory_size
    }

    _call(processes, process_index, gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var dest = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case "A":
                this.memory[dest].a = this._mul(this.memory[source].a, this.memory[dest].a)
                break
            case "B":
                this.memory[dest].b = this._mul(this.memory[source].b, this.memory[dest].b)
                break
            case "AB":
                this.memory[dest].b = this._mul(this.memory[source].a, this.memory[dest].b)
                break
            case "BA":
                this.memory[dest].a = this._mul(this.memory[source].b, this.memory[dest].a)
                break
            case "F": case "I":
                this.memory[dest].a = this._mul(this.memory[source].a, this.memory[dest].a)
                this.memory[dest].b = this._mul(this.memory[source].b, this.memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                let [d_a, d_b] = [this.memory[dest].a, this.memory[dest].b]
                this.memory[dest].a = this._mul(s_b, d_a)
                this.memory[dest].b = this._mul(s_a, d_b)
                break
            default:
                break
        }
        processes[process_index] = (processes[process_index] + 1) % this.memory_size
    }
}

//seq
class Seq extends Command {
    _compare_commands(c1, c2) {
        if (Object.getPrototypeOf(c1) !== Object.getPrototypeOf(c2))
            return false
        if (c1.a !== c2.a || c1.b !== c2.b  || c1.mod !== c2.mod)
            return false
        if (c1.a_am !== c2.a_am || c1.b_am !== c2.b_am)
            return false
        return true
    }

    _compare(cond, processes, process_index) {
        if (cond){
            processes[process_index] = (processes[process_index] + 2) % this.memory_size
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var acheck = this.get_true_index(this.a, this.a_am)
        var bcheck = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A':
                this._compare((this.memory[acheck].a === this.memory[bcheck].a), processes, process_index)
                break
            case 'B':
                this._compare((this.memory[acheck].b === this.memory[bcheck].b), processes, process_index)
                break
            case 'AB':
                this._compare((this.memory[acheck].a === this.memory[bcheck].b), processes, process_index)
                break
            case 'BA':
                this._compare((this.memory[acheck].b === this.memory[bcheck].a), processes, process_index)
                break
            case 'F':
                var cond = (this.memory[acheck].a === this.memory[bcheck].a) && (this.memory[acheck].b === this.memory[bcheck].b)
                this._compare(cond, processes, process_index)
                break
            case 'I':
                var cond = this._compare_commands(this.memory[acheck], this.memory[bcheck])
                this._compare(cond, processes, process_index)
                break
            case 'X':
                var cond = (this.memory[acheck].a === this.memory[bcheck].b) && (this.memory[acheck].b === this.memory[bcheck].a)
                this._compare(cond, processes, process_index)
                break
            default:
                break
        }

    }
}

//slt
class Slt extends Command {
    _compare(cond, processes, process_index) {
        if (cond){
            processes[process_index] = (processes[process_index] + 2) % this.memory_size
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var acheck = this.get_true_index(this.a, this.a_am)
        var bcheck = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A':
                this._compare(this.memory[acheck].a < this.memory[bcheck].a, processes, process_index)
                break
            case 'B':
                this._compare(this.memory[acheck].b < this.memory[bcheck].b, processes, process_index)
                break
            case 'AB':
                this._compare(this.memory[acheck].a < this.memory[bcheck].b, processes, process_index)
                break
            case 'BA':
                this._compare(this.memory[acheck].b < this.memory[bcheck].a, processes, process_index)
                break
            case 'I': case 'F':
                var cond = (this.memory[acheck].a < this.memory[bcheck].a) && (this.memory[acheck].b < this.memory[bcheck].b)
                this._compare(cond, processes, process_index)
                break
            case 'X':
                var cond = (this.memory[acheck].a < this.memory[bcheck].b) && (this.memory[acheck].b < this.memory[bcheck].a)
                this._compare(cond, processes, process_index)
                break
            default:
                break
        }
    }
}

//sne
class Sne extends Command {
    _compare_commands(c1, c2) {
        if (Object.getPrototypeOf(c1) !== Object.getPrototypeOf(c2))
            return true
        if (c1.a !== c2.a || c1.b !== c2.b  || c1.mod !== c2.mod)
            return true
        if (c1.a_am !== c2.a_am || c1.b_am !== c2.b_am)
            return true
        return false
    }

    _compare(cond, processes, process_index) {
        if (cond){
            processes[process_index] = (processes[process_index] + 2) % this.memory_size
        }
        else {
            processes[process_index] = (processes[process_index] + 1) % this.memory_size
        }
    }

    _call(processes, process_index, gen, p){
        var acheck = this.get_true_index(this.a, this.a_am)
        var bcheck = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case 'A':
                this._compare(this.memory[acheck].a !== this.memory[bcheck].a, processes, process_index)
                break
            case 'B':
                this._compare(this.memory[acheck].b !== this.memory[bcheck].b, processes, process_index)
                break
            case 'AB':
                this._compare(this.memory[acheck].a !== this.memory[bcheck].b, processes, process_index)
                break
            case 'BA':
                this._compare(this.memory[acheck].b !== this.memory[bcheck].b, processes, process_index)
                break
            case 'F':
                var cond = (this.memory[acheck].a !== this.memory[bcheck].a) || (this.memory[acheck].b !== this.memory[bcheck].b)
                this._compare(cond, processes, process_index)
                break
            case 'I':
                var cond = this._compare_commands(this.memory[acheck], this.memory[bcheck])
                this._compare(cond, processes, process_index)
                break
            case 'X':
                var cond = (this.memory[acheck].a !== this.memory[bcheck].b) || (this.memory[acheck].b !== this.memory[bcheck].a)
                this._compare(cond, processes, process_index)
                break
            default:
                break
        }

    }
}

//spl
class Spl extends Command {
    _call(processes, process_index, gen, p){
        // new branch
        var destination_index = this.get_true_index(this.a, this.a_am)
        processes.splice(process_index+1,0, destination_index)
        processes[process_index] = (processes[process_index] + 1) % this.memory_size
        // continue on old shit
        gen.next()
    }
}

//sub
class Sub extends Command {
    _sub(source, target){
        var ret = target - source
        if (ret < 0)
            ret += this.memory_size
        return ret
    }

    _call(processes, process_index, gen, p){
        var source = this.get_true_index(this.a, this.a_am)
        var dest = this.get_true_index(this.b, this.b_am)
        switch(this.mod){
            case "A":
                this.memory[dest].a = this._sub(this.memory[source].a, this.memory[dest].a)
                break
            case "B":
                this.memory[dest].b = this._sub(this.memory[source].b, this.memory[dest].b)
                break
            case "AB":
                this.memory[dest].b = this._sub(this.memory[source].a, this.memory[dest].b)
                break
            case "BA":
                this.memory[dest].a = this._sub(this.memory[source].b, this.memory[dest].a)
                break
            case "F": case "I":
                this.memory[dest].a = this._sub(this.memory[source].a, this.memory[dest].a)
                this.memory[dest].b = this._sub(this.memory[source].b, this.memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [this.memory[source].a, this.memory[source].b]
                let [d_a, d_b] = [this.memory[dest].a, this.memory[dest].b]
                this.memory[dest].a = this._sub(s_b, d_a)
                this.memory[dest].b = this._sub(s_a, d_b)
                break
            default:
                break
        }
        processes[process_index] = (processes[process_index] + 1) % this.memory_size
    }
}

export {
    Command,
    Add,
    Dat,
    Div,
    Djn,
    Jmn,
    Jmp,
    Jmz,
    Mod,
    Mov,
    Mul,
    Seq,
    Slt,
    Sne,
    Spl,
    Sub
}
