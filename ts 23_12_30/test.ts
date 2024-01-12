const a:number = 1;
console.log(a);

/* 
    我们在使用ts的时候 需要将编写的ts代码转换为js 在运行
    typeScript 这个模块 来进行文件的编译

    npm install typescript -g  全局的包在命令行中使用  tsc

    1) 最终直接生成js文件在运行
        tsc --init 初始化ts的配置文件

    2) 比较适合临时测试的文件
        vscode插件来实现代码的运行
        code-runner 如果是js文件，内部会直接采用node+文件名来执行文件，如果是ts文件 需要通过ts-node 来直接执行

    3) 通过构建工具将代码转化成js在去执行 (webpack,rollup,esbuild)最终变成js文件

*/