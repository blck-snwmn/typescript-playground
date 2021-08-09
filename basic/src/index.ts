console.log('Hello TypeScript!')

function greet(name: string) {
    const msg = "hello" + name
    console.log(msg)
}

greet("bob")
// greet(1) // error!

let u: unknown = 10
// let x = u * 10 // error!
let x = u === 10

if (typeof u === 'number') {
    console.log("u is number") // in
}


{
    // bool
    let x = true
    // literal type. 
    // １つの値のみを表す。それ以外の値はassignできない
    let xx: true = true
    xx = true
    // xx is literal type, not assign
    // xx = false // error!
    xx = x
    x = false // after set, assigning false is ok

    let s: "xx" = "xx"
}
{
    // symbol
    let x1 = Symbol(1)
    let x2 = Symbol(1)
    console.log("x1===x2", x1 == x2, x1 === x2) // false, false
}
{
    // object
    let x = {
        number: 10
    }
    class Have {
        constructor(
            public number: number,
        ) { }
    }
    let xx: Have = new Have(10)
    // 構造的型付け（structual typing）なので、アサインできる（ダックタイピング）
    xx = x
    x = xx
    // x = {} // 構造が異なるのでアサインできない
    // x = {
    //     number: 100
    //     number2: 100 // 余分なプロパティは持てない
    // }

    let y: {
        num: number
        name?: string
        first: boolean
        [key: number]: string // index sygnature
    }
    y = {
        num: 100,
        name: "a",
        first: true,
        1: "a", 2: "b"
    }
    y = {
        num: 100,
        first: true,
        1: "a", 2: "b"
    }
    y = {
        num: 100,
        name: "a",
        first: true,
    }
    // first property is required
    // y = { 
    //     num: 100,
    //     name: "a", 
    //     1: "a", 2: "b"
    // }

    // num property is required
    // y = {
    //     name: "a",
    //     first: true,
    //     1: "a", 2: "b"
    // }
}
{
    // type alias
    type ID = string

    type Book = {
        id: ID
    }

    let id: ID = 'a'
    let b1: Book = {
        id: id
    }

    let b2: Book = {
        id: "a"
    }
}
{
    {
        type Book = { id: string, name: string }
        type Bread = { name: string, price: number }
        // 合併はどちらか、または、両方のプロパティがあればOK
        type BreadOrBook = Book | Bread
        // let bb0: BreadOrBook = { // error!
        //     id: '1',
        // }
        let bb1: BreadOrBook = {
            id: '1',
            name: "1"
        }
        let bb2: BreadOrBook = {
            name: "pan",
            price: 100
        }
        let bb3: BreadOrBook = {
            id: '1',
            name: "pan",
            price: 100
        }
        // 交差は両方のプロパティが必須
        type BookBread = Book & Bread
        let bb4: BookBread = {
            id: '1',
            name: "pan",
            price: 100
        }
    }
    {
        // 同名だが、型が違うものもOK
        type Book = { id: string, name: string }
        type Bread = { name: number }
        type BreadBook = Book | Bread
        let bb1: BreadBook = {
            id: '1',
            name: "1"
        }
        let bb2: BreadBook = {
            id: '1',
            name: 2
        }
    }
}
{
    // array
    let x1 = [1, 2]
    x1.push(3)
    // x1.push("a") // error!

    let x2 = [1, "2"] // x2 = (string|number)[]
    x2.push(1)
    x2.push("3")
    // x2.push(true) // ng

    function gen() {
        let a = []
        a.push(true)
        a.push("2")
        return a
    }
    let a = gen()
    a.push(true)
    // a.push(1) // errrors
}
{
    let x: [string, number] = ["a", 1]
    x = ["x", 2]
    // x = ["x", "a"] // error

    let x2: [string, ...number[]] = ["a"]
    x2 = ["b", 2]
    x2 = ["b", 2, 3, 4, 5]
    // x2 = ["b", 2, 3, 4, 5, "a"] // error

    let x3: [string, number?] = ["z"]
    x3 = ["x", 3]
    // x3 = ["x", 3, 4] // error
}
{
    const x = [1, 2, 3]
    // x = [3, 4, 5]// 再割当てはできない
    x.push(1) // 要素の追加はできる

    let xx: readonly number[] = [1, 2, 3]
    // xx.push(1) // push は存在しない
    let x3 = xx.map(x => x * 3)
    let x4 = xx.concat(xx)
}
