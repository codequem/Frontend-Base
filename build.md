# step 1 使用 vite 创建 vue + ts 前端项目

- 使用 create-vite@6.5.0 + vite@6.3.5进行开发
- 前端文件夹为analysis

```bash
npm create vite@6 analysis
```

# step 2 指定前端端口为9000

- 修改package.json文件

  - 源文件：

    ``` json
    "scripts": {
        "dev": "vite --port",
        "build": "vue-tsc -b && vite build",
        "preview": "vite preview"
    }
    ```

  - 修改后：

    ```json
    "scripts": {
        "dev": "vite --port 9000",
        "build": "vue-tsc -b && vite build",
        "preview": "vite preview --port 9000"
    }
    ```

# step 3 引入 tailwindcss 依赖

- 安装 tailwindcss 

  ``` bash
  npm install tailwindcss @tailwindcss/vite
  ```

- 修改 vite.config.ts

  - 源文件：

    ``` js
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    
    // https://vite.dev/config/
    export default defineConfig({
      plugins: [
        vue()
      ],
    })
    ```

  - 修改后：

    ``` js
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import tailwindcss from '@tailwindcss/vite'
    
    // https://vite.dev/config/
    export default defineConfig({
      plugins: [
        vue(), 
        tailwindcss()
      ],
    })
    ```

- 在 src 目录下新建文件 tailwind.css

  ``` css
  @import "tailwindcss";
  ```

- 在 main.ts 中添加

  ``` js
  import './tailwind.css'
  ```

  