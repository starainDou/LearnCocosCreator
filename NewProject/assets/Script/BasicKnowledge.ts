export default class BasicKnowwledge {

    static readonly sharedInstance: BasicKnowwledge = new BasicKnowwledge();

    public testStart() {
        this.testDataType();
        this.testPrint();
        this.testNumber();
    }
    /**
     * 简单数据类型
     * let 声明块级作用域的变量
     * var 声明全局作用域或函数作用域的变量，存在变量提升现象
     * const 声明常量，声明时必须赋值，一旦赋值同一作用域不能在再重新赋值，但定义的引用类型，可以改变内部数据
     */
    public testDataType() {
        // 指定类型
        const str: string =  'Home page string';
        const num: number = 1; // ts不具体区分 int float double
        const isRequesting: boolean = false;
        let result: undefined = undefined;
        let variable:null = null;
        console.log(str + " 类型是：" + typeof str);
        console.log(num + " 类型是：" + typeof num);
        console.log(isRequesting + " 类型是：" + typeof isRequesting);
        console.log(result + " 类型是：" + typeof result);
        console.log(variable + " 类型是：" + typeof variable);

        // let/const 不允许先用后声明，这种现象称为：暂时性死区，英文为：temporal dead zone，简称 TDZ。
        // var允许声明前使用（变量提升）
        // console.log(name); // Block-scoped variable 'name' used before its declaration
        console.log("age " + age + " 类型是：" + typeof age); // age undefined 类型是：undefined
        // console.log("id " + id + " 类型是：" + typeof id);
        // 自动推断类型(类型推导)
        let name = 'First page string';
        // let 变量不能重复声明，var变量可以重复声明，只得到最后一次声明的变量
        var age = 18;
        var age = 18.8; // 覆盖上次的声明
        const id = '12580';
        console.log("name: " + name + " 类型是：" + typeof name);
        console.log("age " + age + " 类型是：" + typeof age); // age 18.8 类型是：number
        console.log("id " + id + " 类型是：" + typeof id);
        {
            const firstName = 'Wang';
            let lastName = 'Ming';
            var grade = 6;
            console.log("firstName " + firstName + " 类型是：" + typeof firstName);
            console.log("lastName " + lastName + " 类型是：" + typeof lastName);
            console.log("grade " + grade + " 类型是：" + typeof grade);
        }
        const firstName = 'Li';
        console.log("firstName " + firstName + " 类型是：" + typeof firstName);
        // let 作用域为代码块，var 作用域为函数或全局
        // console.log("lastName " + lastName + " 类型是：" + typeof lastName);
        console.log("grade " + grade + " 类型是：" + typeof grade);
    }
    /**
     * console.log(a) 打印a的值
     * typeof a 获取a的类型
     */
    public testPrint() {
        // 存在变量提升
        for (var i = 0; i <= 2; i++) {
            console.log("print3:" + i);
            setTimeout(() => {
                console.log("print4:" + i);
            });
        }
        for (let i = 0; i <= 2; i++) {
            console.log("print5:" + i);
            setTimeout(() => {
                console.log("print6:" + i);
            });
        }
        for (var i = 0; i <= 2; i++) {
            console.log("print1:" + i);
        }
        for (let i = 0; i <= 2; i++) {
            console.log("print2:" + i);
        }
        // 顺序是 print3:[0 1 2]  print5:[0 1 2] print1:[0 1 2] print2:[0 1 2]  print4:[3 3 3] print6:[0 1 2] 
        // print4 为何输出了大于2的值3,且值都相同？ 
        // 大于3：ts/js是单线程，异步的setTimeout()会等同步代码执行完之后才开始计时，此时i为跳出循环的值:3
        // 都相同：print6 let修饰异步setTimeout()捕获当前创建的变量，print4 var修饰，作用域为函数，被捕获的是同一个变量。
        // var变量提升hoisting，将变量和函数声明移动到所在作用域的顶部，分两个阶段
        // 声明阶段：变量名被提升到作用域顶部，但不会赋值。如果函数声明，函数整个定义也会被提升
        // 初始化阶段：代码执行到变量声明位置时，会被实际赋值，如果代码中没有显示的赋值操作，那么变量被初始化为 undefined
    }

    /**
     * testNumber
     * Number.MAX_SAFE_INTEGER 精度范围内能表示的整数最大值 2^53 - 1 = 9007199254740991，超过该值发生精度问题
     * Number.MIN_SAFE_INTEGER 精度范围内能表示的整数最大值 -2^53 + 1 = -9007199254740991
     * Number.MAX_VALUE 精度范围内最大值 1.7976931348623157e+308
     * Number.MIN_VALUE 精度范围内最小值 5e-324
     * Infinity 无穷大 (-Infinity 负无穷大)
     * 想表示更大数，可以用 bigint等 如 decimal.js bignumber.js big.js
     * 精度问题：浮点数时，某些十进制小数可能无法用精确的二进制表示，如 0.1 + 0.2 可能产生一个 0.30000000000000004
     */
    public testNumber() {
        let value: number = 0.1 + 0.2; // 不会精确等于 0.3
        console.log(value); // 输出可能是 0.30000000000000004

        let safeInt1: number = Number.MAX_SAFE_INTEGER + 1; // 超出安全整数范围
        let safeInt2: number = Number.MAX_SAFE_INTEGER + 2; // 超出安全整数范围
        console.log(safeInt1 === safeInt2); // 输出可能是 true，因为精度丢失

        let num1: number = 10000 // 十进制
        let num2: number = 0b100 // 二进制
        let num3: number = 0o100 // 八进制
        let num4: number = 0x100 // 十六进制
        console.log(num1);
        console.log(num2);
        console.log(num3);
        console.log(num4);

    }
}

// https://blog.csdn.net/qq_44749491/article/details/127439175