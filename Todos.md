# All functions

  ## Basic
    {done} .config(configurations : Object)

  ## Request methods
    {done} .get(url: string, ignoreBaseUrl:bool)
    .put(url: string, ignoreBaseUrl:bool)
    .patch(url: string, ignoreBaseUrl:bool)
    .delete(url: string, ignoreBaseUrl:bool)
  
  ## Request 
    ### Header
      .headers(headers: Object)
      .useToken(token?: string) // default will be loaded from localStorage with localStorage.getItem(httproConfig.tokenKey)

    ### URL
      {wip}.query(queryParams: Object)
    
    ### Body
      .body(body: Object)
      .file(fileName, file)

  ## Response 
    ### Body
      .map(mapFunc: Func<response: string>) // parse the response before returning it into or setting it in the model

    ### Events
      .onProgress(onProgress: Func<{percentage: number, total: number}>) // v2

  ## Execution
    .exec(model? : HttproModel) : Promise<object>