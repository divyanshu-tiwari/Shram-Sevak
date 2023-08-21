[33mcommit c08ca1f3be835d0fabe41fc5a87a66bd8e229ecf[m[33m ([m[1;36mHEAD -> [m[1;32mworker-entity[m[33m)[m
Author: PSGsahil <132652957+PSGsahil@users.noreply.github.com>
Date:   Mon Aug 21 20:56:03 2023 +0530

    Worker entity created

[33mcommit fc40dd118a6e7138afd5501c301f23919cc0f872[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m, [m[1;32mconfigure-customer-service[m[33m)[m
Merge: 5197db6 7a2c453
Author: jayesh <jayesh.sinnarkar@gmail.com>
Date:   Sun Aug 20 18:26:24 2023 +0530

    Merge pull request #23 from divyanshu-tiwari/configure-package.json
    
    Configure package.json

[33mcommit 7a2c453f0f2de9d75c79cdd4932f01a408e9a467[m
Author: Jayesh-Sinnarkar <jayesh.sinnarkar@gmail.com>
Date:   Sun Aug 20 17:40:31 2023 +0530

    add navigation bar and home page carousel

[33mcommit 5c049af57c47dd65acbb8dd9169ce6d4df2348bd[m
Author: Jayesh-Sinnarkar <jayesh.sinnarkar@gmail.com>
Date:   Sun Aug 20 14:59:28 2023 +0530

    add Tailwind CSS to index.css

[33mcommit 4ea23dfa0e159811194e2780dbd68862f525953b[m
Author: Jayesh-Sinnarkar <jayesh.sinnarkar@gmail.com>
Date:   Sun Aug 20 14:41:36 2023 +0530

    add material UI, tailwind CSS, react-alice-carousel, emotion/styled etc to json configurations

[33mcommit 5197db6720344c6f112a1aed6b358331e770de85[m
Merge: a0c4bb3 9366a6f
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 18:50:01 2023 +0530

    Merge pull request #19 from divyanshu-tiwari/development
    
    Development

[33mcommit 9366a6f84f272198e90fef191ed292527cbe87c0[m
Merge: 6d920d8 102284c
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 18:10:48 2023 +0530

    Merge branch 'development' of github.com:divyanshu-tiwari/Shram-Sevak into development

[33mcommit 6d920d850bf4888ed74984a00225be4a98406ab0[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 18:09:34 2023 +0530

    fix typos in API-GATEWAY specific config

[33mcommit 7293fa8d4f8e5cbf6e94f8c0fd4c43e0c067bddf[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 18:08:13 2023 +0530

    add API-GATEWAY specific configuration to config

[33mcommit 29b7d8b52dddfe9cc92d561ffa603dce392e7554[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 18:07:13 2023 +0530

    configure application.yaml of API-GATEWAY

[33mcommit 91b2c4524543093d229747f8af233c84c340bb7a[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 17:58:48 2023 +0530

    add blank implementation of API-GATEWAY

[33mcommit 102284c78a0a9b3fe7f8e1e6f918d4384996d66a[m
Merge: 6699fb0 a0c4bb3
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 01:23:50 2023 +0530

    Merge pull request #18 from divyanshu-tiwari/main
    
    Merge pull request #17 from divyanshu-tiwari/development

[33mcommit 6699fb00441b0862b33b2b0bacea24ad34bc56db[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 01:15:54 2023 +0530

    patch worker-service to work with config-server
    
    this is a test patch to check integration between worker-service, config-server and service-registry.
    the patch will throw error if worker entity is not defined and workerService is extending from JpaRepositoy.
    Ideally, define the worker entity ASAP and uncomment the "extends JpaRepositoy" in workerService.

[33mcommit a0c4bb384cde38a5d717781cb330e7193abebd76[m
Merge: 2a36c6b 5a0e224
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Fri Aug 18 01:01:27 2023 +0530

    Merge pull request #17 from divyanshu-tiwari/development
    
    Development merge with main as config server has been configured properly

[33mcommit 5a0e224a1b5e099fc366ce7e735cf330de63f860[m
Merge: 05f6905 ca1eb7b
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Thu Aug 17 23:53:04 2023 +0530

    Merge branch 'development' of github.com:divyanshu-tiwari/Shram-Sevak into development

[33mcommit 05f6905af333d513935d3d7a1fe552272a81d39c[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Thu Aug 17 23:46:34 2023 +0530

    configure the config-server and customer service
    
    customer-service was not able to register with config-server and subsequently with service-registry due to errorneous configurations and missing dependencies in the both the config-server and customer-service

[33mcommit ca1eb7b31b31169023e5cecb6a87346d406967cd[m
Merge: dcd0290 2a36c6b
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Thu Aug 17 23:37:04 2023 +0530

    Merge pull request #16 from divyanshu-tiwari/main
    
    Merge pull request #10 from divyanshu-tiwari/development

[33mcommit 327dee51811b5ddd34a4eca79d326ff6671178d5[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 15:23:14 2023 +0530

    fix invalid character error in application.yaml

[33mcommit dcd0290ddb21cf5b757421ec00d00e0e96936de6[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 15:16:07 2023 +0530

    correct typo in service-registry/application.yaml

[33mcommit 0ea919122dec3862308e68a44873df9c3a7d5392[m
Merge: e049531 bcfcfd2
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 15:11:31 2023 +0530

    Merge branch 'development' of github.com:divyanshu-tiwari/Shram-Sevak into development

[33mcommit bcfcfd23f9a388771e61af4b59bfdcee107dee20[m
Merge: a8283fd 3e5db6e
Author: TARJAN SAHU <135534654+TarjanSahu@users.noreply.github.com>
Date:   Wed Aug 16 15:09:49 2023 +0530

    Merge pull request #11 from divyanshu-tiwari/config-server
    
    implement config server

[33mcommit 2a36c6b950d7bac7737c73da21958f0180654989[m
Merge: 49d90a1 a8283fd
Author: TARJAN SAHU <135534654+TarjanSahu@users.noreply.github.com>
Date:   Wed Aug 16 15:09:11 2023 +0530

    Merge pull request #10 from divyanshu-tiwari/development
    
    Merge pull request #8 from divyanshu-tiwari/main

[33mcommit e049531853c3c1ca0ec2d0a8d8284b355846d1f2[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 15:03:42 2023 +0530

    change configuration for service registry
    
    service registry kept on throwing exceptions as had no other service registry to register itself with.

[33mcommit a8283fd1dde5c4eb245e02a790a84a606e711dd9[m
Merge: bef40f0 b289afa
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 13:47:34 2023 +0530

    Merge pull request #12 from divyanshu-tiwari/configure-customer-service
    
    Add configuration of customer service

[33mcommit bef40f0e0fc9e673a6a58003863f97c242be0e70[m
Merge: 66372fc 520f0de
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 13:45:29 2023 +0530

    Merge pull request #13 from divyanshu-tiwari/worker-service
    
    bootstraped worker service

[33mcommit 520f0de3211871a12f27f8976073730fa837bef4[m[33m ([m[1;31morigin/worker-service[m[33m)[m
Author: ashish-thattikota3101 <132429752+ashish-thattikota3101@users.noreply.github.com>
Date:   Wed Aug 16 13:41:24 2023 +0530

    bootstraped worker service

[33mcommit 66372fcb87744e004bf8bda7a4803be51b688d74[m
Merge: c7ae03a 49d90a1
Author: PSGsahil <132652957+PSGsahil@users.noreply.github.com>
Date:   Wed Aug 16 13:27:10 2023 +0530

    Merge pull request #8 from divyanshu-tiwari/main
    
    Merge pull request #5 from divyanshu-tiwari/development

[33mcommit 3e5db6ef4f7db0eceef018ab064bde1cf7bc6ba0[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 13:17:03 2023 +0530

    implement config server

[33mcommit b289afad3404fb417f42b4970034016f7ff8f9dd[m[33m ([m[1;31morigin/configure-customer-service[m[33m)[m
Author: PSGsahil <132652957+PSGsahil@users.noreply.github.com>
Date:   Wed Aug 16 13:13:15 2023 +0530

    Add configuration of customer service

[33mcommit 49d90a176ce967776dd78fba23bd4573e109dbf6[m[33m ([m[1;32mmain[m[33m)[m
Merge: 4586022 c7ae03a
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 12:35:02 2023 +0530

    Merge pull request #5 from divyanshu-tiwari/development
    
    implement service registry

[33mcommit c7ae03a7904b8d5f0bce0cb4a30f2218633176a7[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Wed Aug 16 12:15:15 2023 +0530

    configure service registry
    
    - changed properties to yaml for better readability
    - registry service running on port 8761

[33mcommit 25c07e4154299d37b0e06723e5011b3b6cab5f80[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Tue Aug 15 12:17:30 2023 +0530

    add congifuration for config server to serve

[33mcommit 6513e2b8486d747812f4a06c44b44e7352ef624f[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Mon Aug 14 19:27:03 2023 +0530

    Bootstrap customer-service
    corrected typo in pom.xml of service-registry

[33mcommit 458602269f98e560ee79321cb652ef29ab3ffee8[m
Author: Divyanshu Tiwari <33171967+divyanshu-tiwari@users.noreply.github.com>
Date:   Mon Aug 14 19:20:40 2023 +0530

    Initial commit to bootstrap client and server app
