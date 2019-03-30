import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AppConfigurationService {
    private baseUrl:string = "https://yatelollevo-proxy.azurewebsites.net/";
    
    getProductsByStore(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/ProductsByStore?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getAllProducts(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/Product?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getPropertyUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/Property?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getPropertyValueUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/PropertyValue?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getPhotoServiceUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/Photos?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getCategoryByItemServiceUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/CategoryByItem?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getLoginServiceUrl():string {
        return this.baseUrl + "JWTLogin";
        //return "https://yatelollevo-logicandproxy.azurewebsites.net/api/login?code=f9fHfYcgfg7jvy3NmPIJOaor43B5zH44P4EpqhoL4wJdz1rqsxca2A==";
    }

    getUserServiceUrl():string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/user?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }

    getUserByToken(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/jwt/getuser?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }
    
    getLookAndFeelServiceUrl():string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/LookAndFeel?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }

    getStoresByUser(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/StoresByUser?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }
    
    getStoreByUrlServiceUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/StoreByURL?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w=="
    }

    getStoreByNameServiceUrl(): string {
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/StoreByName?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==';
    }

    getStoreServiceUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/Store?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }

    getItemServiceUrl(): string {
        return "https://yatelollevo-logicandproxy.azurewebsites.net/api/Item?code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==";
    }

    getCategoryServiceUrl(): string {
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/Category?' +
            'code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==';
    }


    getItemCategoryServiceUrl(): string {
        return 'https://yatelollevo-category.azurewebsites.net/api/ItemCategory?' +
            'code=SzakJxkoxDVjSHy6gw/DRPXitC1Zlxsz73SYmiJD21QqkNOUArd6JA==';
    }

    getStatesByStore(): string {
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/StatesByStore?' +
            'code=Du3u7qwaULjPbi1OTYgxOqx/ZoOBS3gk3nkDeTMzqPvyO80hAZZU4w==';
    }

    getStatesUrl(): string {
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/State?' +
            'code=kl4FIpgCuxxjrsRg9nvXppawQuLd9d6Wj2jXbyyAk3QIFvT/c3obMw==';
    }

    getBuysByStore(): string {
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/BuysByStore?' +
            'code=p3IimUNaJQUG1aaTjonMkZhiG2cnR2RSNQYrcw7dDMHArB4TqrBlJg==';
    }

    getBuys(): string {
    /*    return 'http://localhost:7071/api/Buy?' +
            '?code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';*/
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/Buy?' +
            'code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';
    }


    getBuysByAdmin(): string {
        /*return 'http://localhost:7071/api/BuyByUserAdmin?' +
            '?code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';*/
        /*return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/BuyByUserAdmin?' +
            'code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';*/
        return 'https://yatelollevo-logicandproxy.azurewebsites.net/api/BuyByUserAdmin?' +
        'code=OOt5uToTFS26xtMkK/Hdd1/R9izhH2VQ2ML5a1k5VQCNP1Md2gYkmA==';
    }
}
