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
{
    // named function
    // 関数の引数の型指定は必要
    function greet(name: string) {
        console.log("hello", name)
    }
    function nop(a: number) { return a }
    function nopWithAnnotate(a: number): number { return a }


    // new funtion
    function foo(p: string) { return p }
    let _1 = function (p: string) { return p }
    let _2 = (p: string) => { return p }
    let _3 = (p: string) => p
    let _4 = new Function('foo', 'return p') // これは使用しない！

    // option parameter
    function bar(p?: string) {
        return p || "a"
    }
    console.log(bar())
    console.log(bar("b"))

    // default parameter
    function bar2(p = "bbb") {
        return p
    }
    console.log(bar2())
    console.log(bar2("b"))

    function restParam(...ps: string[]) {
        return ps.toString()
    }
    console.log(restParam())
    console.log(restParam("1"))
    console.log(restParam("1", "2"))

    // this の挙動
    // 同じthisでも出力が変わる
    let a = {
        a() {
            return this
        }
    }
    console.log(a.a()) // { a: [Function: a] }
    let aa = a.a
    console.log(aa()) // undefined

    type Hoge = { name: string }
    function greetHoge(this: Hoge) {
        return this.name
    }
    // greetHoge.call("a") // stringは割当できないとerror!
    let h: Hoge = { name: "a" }
    greetHoge.call(h)

    {
        // generater
        function* increment() {
            let i = 1
            while (true) {
                console.log("generate:", i)
                yield i
                i++
                if (i % 3 == 0) {
                    return
                }
            }
        }
        let g = increment()
        console.log(g.next())
        console.log(g.next())
        console.log(g.next())

        console.log("generated by for")
        let g2 = increment()
        for (let i = 0; i < 5; i++) {
            console.log(g2.next())
        }
        console.log("generated for-of")
        let g3 = increment()
        for (const v of g3) {
            console.log(v)
        }
    }

    {
        // iterator
        let increment2 = {
            *[Symbol.iterator]() {
                let i = 1
                while (i % 3 != 0) {
                    console.log("iterate:", i)
                    yield i
                    i++
                }
            }
        }
        for (const v of increment2) {
            console.log(v)
        }
    }

    // context typing
    function loop(f: (i: number) => void, n: number) {
        for (let i = 0; i < n; i++) {
            f(i)
        }
    }

    loop(console.log, 10)

    // overload
    type Sample = {
        (i: number, j: string): string
        (i: number, j: number): string
    }
    // let f: Sample = (i: number) => { } // 型 '(i: number) => void' を型 'Sample' に割り当てることはできません。    型 'void' を型 'string' に割り当てることはできません。

    // 2つのシグニチャを両方満たす必要がある
    let f: Sample = (
        i: number,
        j: string | number,
    ) => {
        if (typeof j == "string") {
            return "(i: number, j: string): string"
        }
        return "(i: number, j: number): string"
    }
    console.log(f(1, 2))
    console.log(f(1, "s"))

    type judgeString = {
        (s: "a"): string
        (s: "b"): string
        (s: "c"): string
        (s: "d"): string
        (s: string): string
    }
    // より汎用的なtypeはOK
    let js: judgeString = (s: string) => {
        switch (s) {
            case "a":
                return "A"
            case "b":
                return "B"
            case "c":
                return "C"
            case "d":
                return "D"
            default:
                return "-"
        }
    }
    console.log(js("a"))
    console.log(js("b"))
    console.log(js("c"))
    console.log(js("d"))
    console.log(js("non"))


    function hasPropertyFunc(s: string) {
        if (hasPropertyFunc.canDo) {
            console.log(s, "do")
            return
        }
        console.log(s, "wait...")
    }
    hasPropertyFunc.canDo = false
    type HasPropertyFunc = {
        (s: string): void
        canDo: boolean
    }
    const hpf1: HasPropertyFunc = hasPropertyFunc
    const hpf2: HasPropertyFunc = hasPropertyFunc

    hpf1("hpf1") // hpf1 wait...
    hasPropertyFunc.canDo = true
    hpf1("hpf1") // hpf1 do
    hpf1.canDo = false
    hpf1("hpf1") // hpf1 wait...
    hpf2("hpf2") // hpf2 wait...

    // generics
    // js 側では単に generics patameter がなくなるだけぽい？（たしかにjsだと型自体が関係ないみたいなものか）
    type Map = {
        <T, S>(inputs: T[], f: (v: T) => S): S[]
    }
    let mf: Map = (inputs, f) => {
        let r = []
        for (const i of inputs) {
            r.push(f(i))
        }
        return r
    }
    console.log(mf([1, 2, 3, 4, 5], s => s.toString()))
    console.log(mf([true, false, true, true], s => {
        if (s) {
            return 1
        }
        return 0
    }))

    function doFunc<T, S>(input: T, f: (value: T) => S): S {
        return f(input)
    }
    console.log(doFunc(1, v => v.toString()))
    console.log(doFunc<number, string>(1, v => v.toString()))

    type Container<T> = {
        item: T[]
        name: string
    }
    let c: Container<string | number> = {
        item: ["a", 2],
        name: "a"
    }
    function showContainer<T>(c: Container<T>) {

    }
    type DefaultContainer<T = string> = {
        item: T[]
        name: string
    }

    type Shape = {
        area: number
    }

    type Circle = Shape & {
        radius: number
    }

    type Triangle = Shape & {
        sideA: number
        sideB: number
        sideC: number
    }

    function half<T extends Shape>(s: T): T {
        return {
            ...s,
            area: s.area / 2
        }
    }

    let ss: Shape = { area: 100 }
    let cc: Circle = { area: 100, radius: 2 }
    let tt: Triangle = { area: 100, sideA: 100, sideB: 10, sideC: 40 }

    let hss: Shape = half(ss)
    console.log(hss)
    let hcc: Shape = half(cc)
    console.log(hcc)
    let htt: Shape = half(tt)
    console.log(htt)


    function doValiableParams<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
        return f(...args)
    }
    console.log(doValiableParams(() => "s"))
    // console.log(doValiableParams(() => "s", 1)) // 第二引数は指定
    console.log(doValiableParams((...args: number[]) => args.length, 1, 2, 3, 4, 5))
}
{
    class Foo {
        private constructor(private arg: string) { }
    }
    // class FooFoo extends Foo{} // コンストラクタがprivate
    // new Foo{} //  new もできない
}
{
    type Creator = {
        typ: string
    }

    class Wood implements Creator {
        typ = "wood"
    }
    class Fish implements Creator {
        typ = "fish"
    }

    let Creator = {
        create(typ: 'wood' | 'fish'): Creator {
            switch (typ) {
                case 'wood': return new Wood
                case 'fish': return new Fish
            }
        }
    }
}
{
    {
        //  (number | {
        //     x: number;
        // })[]
        let x1 = [1, { x: 1 }]

        // const アサーションを用いることで、型
        // readonly [1, {
        //     readonly x: 1;
        // }]
        let x2 = [1, { x: 1 }] as const
    }
    {
        // excess property checking
        type Input = {
            left: string
            rigth?: string
        }
        class Executor {
            constructor(private input: Input) { }
        }

        // ok
        new Executor({
            left: "x",
            rigth: "y"
        })

        // ng
        // new Executor({
        //     left: "x",
        //     rigthx: "y"
        // })

        // ok
        // type assertion があるので、チェックされない
        new Executor({
            left: "x",
            rigthx: "y"
        } as Input)


        // ok
        // 変数割当がされているので、チェックされない
        let i = {
            left: "x",
            rigthx: "y"
        }
        new Executor(i)

        // ng
        // 変数へ割当されているが、型指定があるため、
        // 変数割当時に、excess property checking の対象となり、NG
        // let ii: Input = {
        //     left: "x",
        //     rigthx: "y"
        // }
        // new Executor(i)
    }
    {
        type Alpha = 'A' | 'B'

        function doFunc(params: Alpha) {
        }

        function doWrapFunc(params: Alpha | string) {
            // ここでは params = Alpha | string になり、doFunc の インターフェースに合わない
            // doFunc(params)


            if (typeof params === 'string') {
                return
            }
            doFunc(params)
        }
    }
    {
        type A = { type: 'A', value: string }
        type B = { type: 'B', value: number }

        function isANG(p: A | B) {
            if (typeof p.value === 'string') {
                let x = p // 合併型として推論される
                return
            }
            let x = p // // 合併型として推論される
        }

        function isA(p: A | B) {
            if (p.type === 'A') {
                let x = p // type A として推論される
                return
            }
            let x = p // // type B として推論される
        }
    }
    {
        type Alpha = 'A' | 'B' | 'C'
        type Alpha2 = 'X' | 'Y' | 'Z'
        function switchAplpha(a: Alpha): Alpha2 {
            switch (a) {
                case 'A':
                    return 'X'
            }
            return 'X'
        }
    }
}