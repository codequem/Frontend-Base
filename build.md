# 基本前端项目搭建

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
    // package.json
    "scripts": {
        "dev": "vite --port",
        "build": "vue-tsc -b && vite build",
        "preview": "vite preview"
    }
    ```
  
  - 修改后：
  
    ```json
    // package.json
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
    // vite.config.ts
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
    // vite.config.ts
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


# step 4 配置别名支持

- 安装 @types/node

  ``` bash
  npm install -D @types/node
  ```

- 修改 vite.config.ts

  - 源文件：

    ```js
    // vite.config.ts
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

  - 修改后：

    ``` js
    // vite.config.ts
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import tailwindcss from '@tailwindcss/vite'
    import path from 'path'
    
    // https://vite.dev/config/
    export default defineConfig({
        plugins: [
            vue(),
            tailwindcss()
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src') // 将 @ 指向 src 目录
            }
        }
    })
    ```

- 修改 tsconfig.json

  - 源文件：

    ```json
    // tsconfig.json
    {
        "files": [],
        "references": [
            {
                "path": "./tsconfig.app.json"
            },
            {
                "path": "./tsconfig.node.json"
            }
        ]
    }
    ```

  - 修改后：

    ```json
    // tsconfig.json
    {
        "files": [],
        "references": [
            {
                "path": "./tsconfig.app.json"
            },
            {
                "path": "./tsconfig.node.json"
            }
        ],
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": [
                    "./src/*"
                ]
            }
        }
    }
    ```

# step 5 配置 typescript 识别 .vue文件

- 在 src 目录下新建 shims-vue.d.ts

  ``` js
  // src/shims-vue.d.ts
  declare module '*.vue' {
      import type { DefineComponent } from 'vue'
      const component: DefineComponent<{}, {}, any>
      export default component
  }
  ```

# step 6 引入 vue-router 依赖

- 安装 vue-router

  ``` bash
  npm install vue-router
  ```

- 在 src 目录下新建目录 router

- 在 src/router 中新建文件 index.ts

  ``` js
  // src/router/index.ts
  import { createRouter, createWebHistory } from 'vue-router'
  
  // 定义路由
  const routes = [
      {
          path: '/',
          name: 'Home',
          component: () => import('@/views/Home.vue') // 后面会创建这个组件
      },
  ]
  
  const router = createRouter({
      history: createWebHistory(),
      routes,
  })
  
  export default router;
  ```

- 在 src 目录下新建目录 views

- 在 src/views 中新建文件 Home.vue

  ``` vue
  <template>
      <div class="p-8">
          <h1 class="text-3xl font-bold">首页</h1>
      </div>
  </template>
  
  <script setup lang="ts">
      
  </script>
  ```

- 修改 App.vue

  - 源文件：

    ``` vue
    <script setup lang="ts">
    
    </script>
    
    <template>
        
    </template>
    
    <style scoped>
    
    </style>
    ```

  - 修改后：

    ```vue
    <script setup lang="ts">
    
    </script>
    
    <template>
        <router-view />
    </template>
    
    <style scoped>
    
    </style>
    ```

- 修改 src/main.ts 注册路由

  - 源文件：

    ``` js
    import { createApp } from 'vue'
    import './tailwind.css'
    import App from './App.vue'
    
    const app = createApp(App);
    app.mount('#app');
    ```

  - 修改后：

    ``` js
    import { createApp } from 'vue'
    import './tailwind.css'
    import App from './App.vue'
    import router from './router'
    
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
    ```

    