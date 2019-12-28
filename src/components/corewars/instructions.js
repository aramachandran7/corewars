//Comand parent class
/*
Below is the command parent class. It includes the get_true_index, pre, post, and both call methods.
Every single assembly instruction that we compiled into JS uses this command class as its parent, and
shares these methods, which we use to alter the memory matrix as needed.
*/
class Command {
    constructor(a, b, a_am, b_am, mod, memory_size){
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
        this.memory_size = memory_size
        this.index = 0
        this.player_id = -1
    }

    init(index, player_id) {
        this.index = index
        this.player_id = player_id
    }

    get_true_index(v, mod, memory) {
        switch(mod){
            case '#':
                return this.index
            case '$' :
                return (this.index + v) % this.memory_size
            case '@': case '<': case '>':
                var new_index = (this.index + v) % this.memory_size
                return (new_index + memory[new_index].b) % this.memory_size
            case '*': case '{': case '}':
                var new_index = (this.index + v) % this.memory_size
                return (new_index + memory[new_index].a) % this.memory_size
            default:
                return -1
        }
    }

    pre(v, mod, memory){
        switch(mod) {
            case "<":
                if (memory[this.index + v].b === 0)
                    memory[this.index + v].b = this.memory_size
                else
                    memory[this.index + v].b -= 1
                break
            case "{":
                if (memory[this.index + v].a === 0)
                    memory[this.index + v].a = this.memory_size
                else
                    memory[this.index + v].a -= 1
                break
            default:
                break
        }
    }

    post(v, mod, memory){
        switch(mod) {
            case "}":
                memory[this.index + v].a = (memory[this.index + v].a + 1) % this.memory_size
                break
            case ">":
                memory[this.index + v].b = (memory[this.index + v].b + 1) % this.memory_size
                break
            default:
                break
        }
    }

    call(memory, processes, current, p){

        this.pre(this.a, this.a_am, memory)
        this.pre(this.b, this.b_am, memory)

        const [new_memory, new_processes, new_current] = this._call(memory, processes, current, p)

        this.post(this.a, this.a_am, memory)
        this.post(this.b, this.b_am, memory)

        return [new_memory, new_processes, new_current]
    }

    _call(memory, processes, current, p){}
    values(){return({a:this.a, b:this.b, a_am:this.a_am, b_am:this.b_am, mod:this.mod})}

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

    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var dest = this.get_true_index(this.b, this.b_am, memory)

        switch(this.mod){
            case "A":
                memory[dest].a = this._add(memory[source].a, memory[dest].a)
                break
            case "B":
                memory[dest].b = this._add(memory[source].b, memory[dest].b)
                break
            case "AB":
                memory[dest].b = this._add(memory[source].a, memory[dest].b)
                break
            case "BA":
                memory[dest].a = this._add(memory[source].b, memory[dest].a)
                break
            case "F": case "I":
                memory[dest].a = this._add(memory[source].a, memory[dest].a)
                memory[dest].b = this._add(memory[source].b, memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                let [d_a, d_b] = [memory[dest].a, memory[dest].b]
                memory[dest].a = this._add(s_b, d_a)
                memory[dest].b = this._add(s_a, d_b)
                break
            default:
                break
        }

        processes[current] = (processes[current] + 1) % this.memory_size
        current += 1
        return [memory, processes, current]
    }
}

//dat
class Dat extends Command {
    _call(memory, processes, current, p){
        processes.splice(current, 1)
        current += 1
        return [memory, processes, current]
    }
}

//div
class Div extends Command {
    constructor(a, b, a_am, b_am, mod, memory, memory_size){
        super(a, b, a_am, b_am, mod, memory, memory_size)
        this._flag = false
    }

    _div(source, target, processes, current){
        if (source === 0 && !this._flag) {
            processes.splice(current,1)
            this._flag = true
            return target
        }
        return (target / source) >> 0
    }

    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var dest = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case "A":
                memory[dest].a = this._div(memory[source].a, memory[dest].a, processes, current)
                break
            case "B":
                memory[dest].b = this._div(memory[source].b, memory[dest].b, processes, current)
                break
            case "AB":
                memory[dest].b = this._div(memory[source].a, memory[dest].b, processes, current)
                break
            case "BA":
                memory[dest].a = this._div(memory[source].b, memory[dest].a, processes, current)
                break
            case "F": case "I":
                memory[dest].a = this._div(memory[source].a, memory[dest].a, processes, current)
                memory[dest].b = this._div(memory[source].b, memory[dest].b, processes, current)
                break
            case "X":
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                let [d_a, d_b] = [memory[dest].a, memory[dest].b]
                memory[dest].a = this._div(s_b, d_a, processes, current)
                memory[dest].b = this._div(s_a, d_b, processes, current)
                break
            default:
                break
        }
        if (!this._flag)
            processes[current] = (processes[current] + 1) % this.memory_size
        this._flag = false
        current += 1
        return [memory, processes, current]
    }
}

//djn
class Djn extends Command {
    _cond(cond, processes, current, dest) {
        if (cond)
            processes[current] = dest
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var dest = this.get_true_index(this.a, this.a_am, memory)
        var check = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A': case 'BA':
                memory[check].a -= 1
                if (memory[check].a < 0)
                    memory[check].a += this.memory_size
                this._cond((memory[check].a !== 0), processes, current, dest)
                break
            case 'B': case 'AB':
                memory[check].b -= 1
                if (memory[check].b < 0)
                    memory[check].b += this.memory_size
                this._cond((memory[check].b !== 0), processes, current, dest)
                break
            case 'I': case 'X': case 'F':
                memory[check].a -= 1
                memory[check].b -= 1
                if (memory[check].a < 0)
                    memory[check].a += this.memory_size
                if (memory[check].b < 0)
                    memory[check].b += this.memory_size
                this._cond((memory[check].a !== 0 || memory[check].b !== 0), processes, current, dest)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
    }
}

//jmn
class Jmn extends Command {
    _cond(cond, processes, current, dest) {
        if (cond)
            processes[current] = dest
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var dest = this.get_true_index(this.a, this.a_am, memory)
        var check = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A': case 'BA':
                this._cond((memory[check].a !== 0), processes, current, dest)
                break
            case 'B': case 'AB':
                this._cond((memory[check].b !== 0), processes, current, dest)
                break
            case 'I': case 'X': case 'F':
                this._cond((memory[check].a !== 0 || memory[check].b !== 0), processes, current, dest)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
    }
}

//jmp
class Jmp extends Command {
    _call(memory, processes, current, p){
        var destination_index = this.get_true_index(this.a, this.a_am, memory)
        processes[current] = destination_index
        current += 1
        return [memory, processes, current]
    }
}

//jmz
class Jmz extends Command {
    _cond(cond, processes, current, dest) {
        if (cond)
            processes[current] = dest
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var dest = this.get_true_index(this.a, this.a_am, memory)
        var check = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A': case 'BA':
                this._cond((memory[check].a === 0), processes, current, dest)
                break
            case 'B': case 'AB':
                this._cond((memory[check].b === 0), processes, current, dest)
                break
            case 'I': case 'X': case 'F':
                this._cond((memory[check].a === 0 && memory[check].b === 0), processes, current, dest)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
    }
}

//mod
class Mod extends Command {
    _mod(source, target, processes, current){
        if (source === 0 && !this._flag) {
            processes.splice(current,1)
            this._flag = true
            return target
        }
        return target % source
    }

    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var dest = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case "A":
                memory[dest].a = this._mod(memory[source].a, memory[dest].a, processes, current)
                break
            case "B":
                memory[dest].b = this._mod(memory[source].b, memory[dest].b, processes, current)
                break
            case "AB":
                memory[dest].b = this._mod(memory[source].a, memory[dest].b, processes, current)
                break
            case "BA":
                memory[dest].a = this._mod(memory[source].b, memory[dest].a, processes, current)
                break
            case "F": case "I":
                memory[dest].a = this._mod(memory[source].a, memory[dest].a, processes, current)
                memory[dest].b = this._mod(memory[source].b, memory[dest].b, processes, current)
                break
            case "X":
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                let [d_a, d_b] = [memory[dest].a, memory[dest].b]
                memory[dest].a = this._mod(s_b, d_a, processes, current)
                memory[dest].b = this._mod(s_a, d_b, processes, current)
                break
            default:
                break
        }
        if (!this._flag) {
            processes[current] = (processes[current] + 1) % this.memory_size
        }
        this._flag = false
        current += 1
        return [memory, processes, current]
    }
}

//mov
class Mov extends Command {
    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var destination = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A':
                //moves the A-field of the source into the A-field of the destination
                memory[destination].a = memory[source].a
                break
            case 'B':
                memory[destination].b = memory[source].b
                break
            case 'AB':
                memory[destination].b = memory[source].a
                break
            case 'BA':
                memory[destination].a = memory[source].b
                break
            case 'I':
                var orig = memory[source]
                memory[destination] = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
                memory[destination].index = destination
                memory[destination].player_id = p
                break
            case 'F':
                memory[destination].a = memory[source].a
                memory[destination].b = memory[source].b
                break
            case 'X':
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                memory[destination].a = s_b
                memory[destination].b = s_a
                break
            default:
                break
        }
        // incrementing by one, after the move
        processes[current] = (processes[current] + 1) % this.memory_size
        current += 1
        return [memory, processes, current]
    }
}

//mul
class Mul extends Command {
    _mul(source, target){
        var ret = target * source
        return ret % this.memory_size
    }

    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var dest = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case "A":
                memory[dest].a = this._mul(memory[source].a, memory[dest].a)
                break
            case "B":
                memory[dest].b = this._mul(memory[source].b, memory[dest].b)
                break
            case "AB":
                memory[dest].b = this._mul(memory[source].a, memory[dest].b)
                break
            case "BA":
                memory[dest].a = this._mul(memory[source].b, memory[dest].a)
                break
            case "F": case "I":
                memory[dest].a = this._mul(memory[source].a, memory[dest].a)
                memory[dest].b = this._mul(memory[source].b, memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                let [d_a, d_b] = [memory[dest].a, memory[dest].b]
                memory[dest].a = this._mul(s_b, d_a)
                memory[dest].b = this._mul(s_a, d_b)
                break
            default:
                break
        }
        processes[current] = (processes[current] + 1) % this.memory_size
        current += 1
        return [memory, processes, current]
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

    _compare(cond, processes, current) {
        if (cond)
            processes[current] = (processes[current] + 2) % this.memory_size
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var acheck = this.get_true_index(this.a, this.a_am, memory)
        var bcheck = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A':
                this._compare((memory[acheck].a === memory[bcheck].a), processes, current)
                break
            case 'B':
                this._compare((memory[acheck].b === memory[bcheck].b), processes, current)
                break
            case 'AB':
                this._compare((memory[acheck].a === memory[bcheck].b), processes, current)
                break
            case 'BA':
                this._compare((memory[acheck].b === memory[bcheck].a), processes, current)
                break
            case 'F':
                var cond = (memory[acheck].a === memory[bcheck].a) && (memory[acheck].b === memory[bcheck].b)
                this._compare(cond, processes, current)
                break
            case 'I':
                var cond = this._compare_commands(memory[acheck], memory[bcheck])
                this._compare(cond, processes, current)
                break
            case 'X':
                var cond = (memory[acheck].a === memory[bcheck].b) && (memory[acheck].b === memory[bcheck].a)
                this._compare(cond, processes, current)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
    }
}

//slt
class Slt extends Command {
    _compare(cond, processes, current) {
        if (cond)
            processes[current] = (processes[current] + 2) % this.memory_size
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var acheck = this.get_true_index(this.a, this.a_am, memory)
        var bcheck = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A':
                this._compare(memory[acheck].a < memory[bcheck].a, processes, current)
                break
            case 'B':
                this._compare(memory[acheck].b < memory[bcheck].b, processes, current)
                break
            case 'AB':
                this._compare(memory[acheck].a < memory[bcheck].b, processes, current)
                break
            case 'BA':
                this._compare(memory[acheck].b < memory[bcheck].a, processes, current)
                break
            case 'I': case 'F':
                var cond = (memory[acheck].a < memory[bcheck].a) && (memory[acheck].b < memory[bcheck].b)
                this._compare(cond, processes, current)
                break
            case 'X':
                var cond = (memory[acheck].a < memory[bcheck].b) && (memory[acheck].b < memory[bcheck].a)
                this._compare(cond, processes, current)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
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

    _compare(cond, processes, current) {
        if (cond)
            processes[current] = (processes[current] + 2) % this.memory_size
        else
            processes[current] = (processes[current] + 1) % this.memory_size
    }

    _call(memory, processes, current, p){
        var acheck = this.get_true_index(this.a, this.a_am, memory)
        var bcheck = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case 'A':
                this._compare(memory[acheck].a !== memory[bcheck].a, processes, current)
                break
            case 'B':
                this._compare(memory[acheck].b !== memory[bcheck].b, processes, current)
                break
            case 'AB':
                this._compare(memory[acheck].a !== memory[bcheck].b, processes, current)
                break
            case 'BA':
                this._compare(memory[acheck].b !== memory[bcheck].b, processes, current)
                break
            case 'F':
                var cond = (memory[acheck].a !== memory[bcheck].a) || (memory[acheck].b !== memory[bcheck].b)
                this._compare(cond, processes, current)
                break
            case 'I':
                var cond = this._compare_commands(memory[acheck], memory[bcheck])
                this._compare(cond, processes, current)
                break
            case 'X':
                var cond = (memory[acheck].a !== memory[bcheck].b) || (memory[acheck].b !== memory[bcheck].a)
                this._compare(cond, processes, current)
                break
            default:
                break
        }
        current += 1
        return [memory, processes, current]
    }
}

//spl
class Spl extends Command {
    _call(memory, processes, current, p){
        var destination_index = this.get_true_index(this.a, this.a_am, memory)

        processes.splice(current + 1, 0, destination_index)

        processes[current] = (processes[current] + 1) % this.memory_size
        current += 2
        return [memory, processes, current]
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

    _call(memory, processes, current, p){
        var source = this.get_true_index(this.a, this.a_am, memory)
        var dest = this.get_true_index(this.b, this.b_am, memory)
        switch(this.mod){
            case "A":
                memory[dest].a = this._sub(memory[source].a, memory[dest].a)
                break
            case "B":
                memory[dest].b = this._sub(memory[source].b, memory[dest].b)
                break
            case "AB":
                memory[dest].b = this._sub(memory[source].a, memory[dest].b)
                break
            case "BA":
                memory[dest].a = this._sub(memory[source].b, memory[dest].a)
                break
            case "F": case "I":
                memory[dest].a = this._sub(memory[source].a, memory[dest].a)
                memory[dest].b = this._sub(memory[source].b, memory[dest].b)
                break
            case "X":
                let [s_a, s_b] = [memory[source].a, memory[source].b]
                let [d_a, d_b] = [memory[dest].a, memory[dest].b]
                memory[dest].a = this._sub(s_b, d_a)
                memory[dest].b = this._sub(s_a, d_b)
                break
            default:
                break
        }
        processes[current] = (processes[current] + 1) % this.memory_size
        current += 1
        return [memory, processes, current]
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