const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定输出文件目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",

    // 告诉webpack打包后的文件不使用箭头函数和const
    // 打包后webpack会给打包后的内容外部包裹一个自执行函数，默认该函数是箭头函数
    environment: {
      arrowFunction: false,
      const: false
    }
  },

  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        test: /\.ts$/,
        use: [
          // 配置babel
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式 "usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },

      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",

          // 引入postcss,postcss为css3语法自动加上兼容头部
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    // 兼容的浏览器版本
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },

  // 配置Webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
  ],

  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }

};