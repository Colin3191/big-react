# big-react
调试方式：

先打包
```shell
pnpm build:dev
```
进入打包后的目录，把react链接到全局：
```shell
cd dist/node_modules/react
pnpm link -g
```
在`create-react-app`创建的项目里使用全局的react包：
```shell
pnpm link react -g
```