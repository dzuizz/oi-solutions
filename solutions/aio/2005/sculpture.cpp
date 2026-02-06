// https://orac2.info/problem/294/
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n,ans=0; cin>>n;
  int a[n],x[n],b[n],y[n];
  long long di[n],dv[n]; di[0]=0;
  for(int i=0;i<n;++i){
    cin>>a[i]>>x[i]>>b[i]>>y[i];
    if(a[i])
      di[a[i]-1]=di[i]+x[i],
      di[b[i]-1]=di[i]+y[i];
  }
  for(int i=n-1;i>=0;--i) if(a[i])
    di[i]=max(di[a[i]-1],di[b[i]-1]);
  memset(dv,0,sizeof dv);
  for(int i=1;i<n;++i){
    di[i]+=dv[i];
    long long k=di[0]-di[i];
    if(a[i]) dv[a[i]-1]+=k+dv[i],dv[b[i]-1]+=k+dv[i];
    ans+=k;
  }
  cout<<ans<<'\n';
  return 0;
}

