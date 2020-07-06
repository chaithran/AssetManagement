using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace dirico_assignment.Common
{
    public class CustomStreamProvider: MultipartFormDataStreamProvider
        {
            private readonly CloudBlobContainer _blobContainer;
            private readonly string[] _supportedMimeTypes = {
                "image/png",
                "image/jpeg",
                "image/jpg",
                 "image/gif", //GIF
                "video/x-msvideo", //Video
                "video/mp4",
                "video/quicktime" };

            public CustomStreamProvider(CloudBlobContainer blobContainer) : base("azure")
            {
                _blobContainer = blobContainer;
            }

            public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
            {
                if (parent == null) throw new ArgumentNullException(nameof(parent));
                if (headers == null) throw new ArgumentNullException(nameof(headers));

                if (!_supportedMimeTypes.Contains(headers.ContentType.ToString().ToLower()))
                {
                    throw new NotSupportedException("Selected file format is not supported");
                }
                
                var fileName = Guid.NewGuid().ToString();

                CloudBlockBlob blob = _blobContainer.GetBlockBlobReference(fileName);

                if (headers.ContentType != null)
                {
                    // Set appropriate content type for your uploaded file
                    blob.Properties.ContentType = headers.ContentType.MediaType;
                }

                this.FileData.Add(new MultipartFileData(headers, blob.Name));

                return blob.OpenWrite();
            }
        }
    }
