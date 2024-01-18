import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NextRouter, useRouter } from 'next/router';
import CrumbComponent from './crumb.component'
import { menus } from '@/utils/menu';
import api from '@/services';


const getPathSplitted = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];

  return pathWithoutQuery.split("/").filter(v => v.length > 0);
}


interface BreadListProps {
  linkRef       : string,
  textDefault   : string | undefined,
  textGenerator?: () => string,
}

const BreadcrumbsComponent = () => {

  const router                  = useRouter();

  const getTextGenrerator       = React.useCallback((param: string, router: NextRouter) => {

    return {
    //   "post_id": () => await fetchAPI(`/posts/${router.query.post_id}/`).title,
      // "create": "Create",
    }[param];
  }, []);
  
  const getDefaultTextGenerator = React.useCallback((subpath: string) => {

    const breadMap:{[key:string]: string} = {};

    menus.forEach( (val, idx) => {
      if(idx != 0){
        if(val.child){
          val.child.forEach(
            (child: any) => {
              breadMap[child.url] = child.title
            }
          )
        }
        else {
          breadMap[val.url] = val.title;
        }
      }
    });
    return breadMap[subpath]
  }, [])

  const breadList:BreadListProps[] = React.useMemo( () => {
    
    const asPathSplit   = getPathSplitted(router.asPath)
    const pathNameSplit = getPathSplitted(router.pathname)
    
    const crumbList = asPathSplit.map( (subpath, idx) => {
      const param = pathNameSplit[idx].replace("[", "").replace("]", "");
  
      const href = asPathSplit.slice(0, idx+1).join("/");

      return {
        linkRef      : "/"+href,
        textGenerator: getTextGenrerator(param, router),
        textDefault  : getDefaultTextGenerator(subpath),
      }
    })
    return [{ linkRef: "/", textDefault: "Home" }, ...crumbList];
  },[router.asPath, router.pathname, router.query])

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {
        breadList.map( (crumb, idx) => (
          <CrumbComponent
            {...crumb}
            key     = {idx}
            last    = {idx === breadList.length-1}
          />
        ))
      }
    </Breadcrumbs>
  )
}

export default BreadcrumbsComponent;