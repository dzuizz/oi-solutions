#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int v,e,q; cin>>v>>e>>q;
  vector<pair<int,int>> g[v]; // {w,v}
  for(int i=0;i<e;++i){
    int u,v,w; cin>>u>>v>>w; --u,--v;
    g[u].emplace_back(w,v);
    g[v].emplace_back(w,u);
  }
  int di[v]; memset(di,0,sizeof di); di[0]=INT32_MAX;
  priority_queue<pair<int,int>> pq; // {d,u}
  pq.emplace(di[0],0);
  while(pq.size()){
    auto[d,u]=pq.top(); pq.pop();
    if(d<di[u]) continue;
    for(auto&[w,v]:g[u]){
      int nd=min(d,w);
      if(nd<=di[v]) continue;
      pq.emplace(di[v]=nd,v);
    }
  }
  while(q--){
    int x; cin>>x;
    cout<<di[--x]<<'\n';
  }
  return 0;
}
