class HomeController {
    async about(req, res) {
       console.log('about') 
    }

    async index(req, res) {
       console.log('index') 
    }
}

export default new HomeController();
