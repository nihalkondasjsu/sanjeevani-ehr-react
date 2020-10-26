import React, { useEffect, useState } from 'react'

import './custom.tabs.css';

class TabPubSub{
    groupActiveTab = {}
    groupSubscribers = {}

    constructor(){
        console.log('TabPubSub','constructor');
        this.groupActiveTab = JSON.parse(
            localStorage.getItem('group-active-tab') || "{}"
        );
    }

    setGroupActiveTab(groupId,tabId){
        console.log('TabPubSub','setGroupActiveTab',groupId,tabId);

        this.groupActiveTab[groupId] = tabId;
        
        localStorage.setItem('group-active-tab',JSON.stringify(this.groupActiveTab));

        if(this.groupSubscribers[groupId]){
            this.groupSubscribers[groupId].forEach((callback)=>{
                callback(groupId,tabId);
            });
        }
    }

    setGroupDefaultActiveTab(groupId,tabId){
        console.log('TabPubSub','setGroupDefaultActiveTab',groupId,tabId);

        if(this.groupActiveTab[groupId]){
            return;
        }
        this.setGroupActiveTab(groupId,tabId);
    }

    subscribeToGroup(groupId,sub){
        console.log('TabPubSub','subscribeToGroup',groupId,sub);

        if(!this.groupSubscribers[groupId]){
            this.groupSubscribers[groupId] = []
        }
        this.groupSubscribers[groupId].push(sub);
    }

    getGroupActiveTab(groupId){
        console.log('TabPubSub','getGroupActiveTab',groupId);

        return this.groupActiveTab[groupId]||'';
    }
}

const tabPubSub = new TabPubSub();

function CustomTabContainer({groupId,activeTabId,children}) {
    
    useEffect(()=>{
        console.log('post CustomTabContainer');
        tabPubSub.setGroupDefaultActiveTab(groupId,activeTabId);
    },[groupId,activeTabId]);
    
    console.log('pre CustomTabContainer')
    
    return (
            <custom-tab-container class={groupId+'-container'}>
                {children}
            </custom-tab-container>
    );
}

function CustomTab({groupId,tabId,children,tabSelected}){

    const [state, setState] = useState(tabPubSub.getGroupActiveTab(groupId)===tabId?'active':'');

    useEffect(()=>{
        tabPubSub.subscribeToGroup(groupId,(relevantGroupId,selectedTabId)=>{
            if(relevantGroupId===groupId){
                setState(selectedTabId===tabId?'active':'');
                console.log('CustomTab',groupId,tabId,state);
                if(selectedTabId===tabId){
                    if(tabSelected)
                        tabSelected()
                }
            }
        });
    },[groupId,tabId,state,tabSelected])

    return (
        <custom-tab class={`${groupId}-container-tab ${tabId}-tab `+state} >
            {children}
        </custom-tab>
    );
}

function CustomTabLink({groupId,tabId,children,alwaysActive}){
    
    alwaysActive = alwaysActive || false;

    const [state, setState] = useState((alwaysActive || tabPubSub.getGroupActiveTab(groupId)===tabId)?'active':'');

    useEffect(()=>{
        tabPubSub.subscribeToGroup(groupId,(relevantGroupId,selectedTabId)=>{
            if(relevantGroupId===groupId){
                setState((alwaysActive || selectedTabId===tabId)?'active':'');
                console.log('CustomTabLink',groupId,tabId,state);
            }
        });
    },[groupId,tabId,state,alwaysActive])

    return (
        <custom-tab-link class={groupId+'-container-tab-link '+tabId+'-tab-link '+state} onClick={()=>{
            tabPubSub.setGroupActiveTab(groupId,tabId);
            console.log(groupId,tabId);
        }}>
            {children}
        </custom-tab-link>
    );
}

export {
    CustomTabContainer,
    CustomTabLink,
    CustomTab
}