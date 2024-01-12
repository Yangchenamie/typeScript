// 默认rollup 打包的时候会查找当前目录下 rollup.config.js这个文件
// 采用es模块来编写配置文件


import ts from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import  path  from "path";
import { fileURLToPath } from "url";

/* 当前文件得绝对路径 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* 打包配置对象 */
export default {
    input: "./src/index.ts",  // 项目入口
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),  // 当前的文件在当前目录下的dist目录
        format: 'iife',  // (function (){})()
        sourcemap:true  // 断点 可以跳到需要断点的源文件ts的位置
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        })
    ]
}