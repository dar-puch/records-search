import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
interface IErrorInfo {
  error: string;
}

export const ErrorInfo: React.FC<IErrorInfo> = ({ error }) => {

  if (isNaN(+error)) {
    return (
      <Card style={{ width: '512px' }}>
        <CardHeader style={{ color: '#fff', height: '176px', background: 'url(../assets/images/flower.jpg) center / cover' }}>No internet</CardHeader>
        <CardContent>
          Check your connection
    </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <img src={`https://http.cat/${error}`} alt={error} />
    </div>
  );
};
