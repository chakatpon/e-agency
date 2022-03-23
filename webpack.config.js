const { resolve } = require("path");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: '/'
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /(node_module)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,

        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(sass|scss)$/,

        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  
  devServer: {

    
    historyApiFallback: true,

    proxy: {
      "/api-login": {
        //target: 'https://vgateway.viriyah.co.th/agencyloginapis',
        target:'https://webagency-test.viriyah.co.th/Agency_Apis',  
       //target:'https://viragencynonsrv.viriyah.co.th/Agency_Apis',        
        auth: "chnpdt:cn21hc",
        changeOrigin: true,
        pathRewrite: {'^/api-login' : ''}
      }
    }
     
  },

    //context: () => true,
    //proxy: { "/proxy/**": { target: 'https://vgateway.viriyah.co.th/agencyloginapis'
    //, secure: false ,changeOrigin: true}  }
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
