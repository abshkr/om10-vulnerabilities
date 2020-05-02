<?php
include_once 'shared/log.php';

class Router
{
    private $request;
    private $supportedHttpMethods = array(
      "GET",
      "POST"
    );

    function __construct(IRequest $request)
    {
        $this->request = $request;
    }

    function __call($name, $args)
    {
        write_log(sprintf("%s::%s() START. name:%s", __CLASS__, __FUNCTION__, $name),
            __FILE__, __LINE__);
        write_log(json_encode($args), __FILE__, __LINE__);

        list($route, $method) = $args;
        write_log($route, __FILE__, __LINE__);
        write_log(json_encode($method), __FILE__, __LINE__);

        if(!in_array(strtoupper($name), $this->supportedHttpMethods)) {
            $this->invalidMethodHandler();
        }

        $this->{strtolower($name)}[$this->formatRoute($route)] = $method;
        write_log(json_encode($this), __FILE__, __LINE__);
    }

    /**
     * Removes trailing forward slashes from the right of the route.
     * @param route (string)
     */
    private function formatRoute($route)
    {
        $result = rtrim($route, '/');
        if ($result === '') {
            return '/';
        }
        return $result;
    }

    private function invalidMethodHandler()
    {
        write_log(sprintf("%s::%s() START.", __CLASS__, __FUNCTION__),
            __FILE__, __LINE__);
        header("{$this->request->serverProtocol} 405 Method Not Allowed");
    }

    private function defaultRequestHandler()
    {
        header("{$this->request->serverProtocol} 404 Not Found");
    }

    /**
     * Resolves a route
     */
    function resolve()
    {
        $methodDictionary = $this->{strtolower($this->request->requestMethod)};
        write_log(json_encode($methodDictionary), __FILE__, __LINE__);
        $formatedRoute = $this->formatRoute($this->request->requestUri);
        $formatedRoute = '/profile';
        $method = $methodDictionary[$formatedRoute];

        if(is_null($method)) {
            $this->defaultRequestHandler();
            return;
        }

        echo call_user_func_array($method, array($this->request));
    }

    function __destruct()
    {
        $this->resolve();
    }
}